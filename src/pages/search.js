import {useState} from 'react'
import DataBox from '../components/dataBox'
import styles from '../styles/pages/search.module.scss'

export default function Home() {

	// ----- 取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

	// ----- 検索ボックスを表示する「state(searchBox)」を作成 -----
	const [searchBox, setSearchBox] = useState(true)

	// ----- 検索項目のデータを設定-----
	const searchList = [
		{id: "nationalName", name: "国名", apiPath: "byName"},
		{id: "capital", name: "首都名", apiPath: "byCapital"},
		{id: "currency", name: "通貨名", apiPath: "byCurrency"},
		{id: "language", name: "言語名", apiPath: "byLanguage"},
		{id: "timeLag", name: "時差（時間）", apiPath: "byTimeLag"},
		{id: "since", name: "建国年", apiPath: "bySince"},
	]

	// ----- DBデータをワード検索して取得する処理 -----
	async function searchTerm() {

		// formのinputでname属性が[serchWord]の要素を取得
		const elements = document.formOfSearch.searchWord

		// 選択されたラジオボタンのvalueをselectValueに代入
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].checked){
				var selectValue = elements[i].value
			}
		}

		// 検索種別の設定
		var searchType = undefined
		searchList.map(item => {
			if (item.id === selectValue) {
				searchType = item.apiPath
			}
		})

		// 入力値の取得
		const searchTerm = document.getElementById('searchInput').value

		// selectValueの値によって処理を分ける
		const res = await fetch(`/api/search/${searchType}/${searchTerm}`)
		const searchData = await res.json()
		setData(searchData)

		// 検索ボックスの表示処理
		if (searchBox) {
			setSearchBox(false)
		} else {
			setSearchBox(true)
		}
	}

	function showBox() {
		// 検索ボックスの表示処理
		if (searchBox) {
			setSearchBox(false)
		} else {
			setSearchBox(true)
		}
	}

	return (
		<>
			{/* 検索エリア表示ボタン */}
			<div className={styles.searchAreaBtn} onClick={showBox}>
				{searchBox ? "検索BOX非表示" : "検索BOX表示"}
			</div>

			{/* 検索エリア */}
			{
				searchBox && (
					<div className={styles.searchArea}>
						<div className={styles.attention}>
							項目をスクロールして検索ジャンルを選択してキーワードを入力して検索
						</div>
						<form name="formOfSearch" className={styles.flex}>
							<div className={styles.gridRadio}>
								<div className={styles.gridRadioScroll}>
									{
										searchList.map(item => {
											return (
												<React.Fragment key={`radioOf${item.id}`}>
													<input
														type="radio"
														name="searchWord"
														id={item.id}
														value={item.id}
														className={styles.inputRadio}
													/>
													<label
														htmlFor={item.id}
														className={styles.inputLabel}
													>
														{item.name}
													</label>
												</React.Fragment>
											)
										})
									}
								</div>
							</div>
							<span className={styles.additionalText}>で</span>
							<div className={styles.gridTextBox}>
								<input
									type="text"
									name="searchInput"
									id="searchInput"
									placeholder="キーワードを入力"
									className={styles.inputTextBox}
								/>
							</div>
							<span className={styles.additionalText}>を</span>
							<div className={styles.gridTextBox}>
								<input
									type="button"
									onClick={searchTerm}
									value="検索 &rarr;"
									className={styles.inputSearchBtn}
								/>
							</div>
						</form>
					</div>
				)
			}

			{/* 表示エリア */
				data && (
					data.map(d => (
						<DataBox
							d={d}
							key={`searchOf${d.data.id}`}
						/>
					))
				)
			}
		</>
	)
}
