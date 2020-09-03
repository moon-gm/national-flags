import {useState} from 'react'
import styles from '../styles/pages/search.module.scss'
import DataBox from '../components/dataBox'

// 検索ボックスパーツ
export default function Home() {

	// ----- 取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

	// ----- 検索ボックスを表示する「state(searchBox)」を作成 -----
	const [searchBox, setSearchBox] = useState(true)

	// ----- エラーメッセージを表示する「state(alert)」を作成 -----
	const [alert, setAlert] = useState(false)

	// ----- 検索ボックスの表示を管理する処理 -----
	function showBox() {
		// 検索ボックスの表示処理
		if (searchBox) {
			setSearchBox(false)
		} else {
			setSearchBox(true)
		}
	}

	// ----- 検索項目のデータを設定 -----
	const searchList = [
		{id: "nationalName", name: "国名", apiPath: "byName"},
		{id: "capital", name: "首都名", apiPath: "byCapital"},
		{id: "currency", name: "通貨名", apiPath: "byCurrency"},
		{id: "language", name: "言語名", apiPath: "byLanguage"},
		{id: "timeLag", name: "時差", apiPath: "byTimeLag"},
		{id: "since", name: "建国年", apiPath: "bySince"},
	]

	// ----- DBデータをワード検索して取得する処理 -----
	async function searchTerm() {

		// formのinputでname属性が[serchWord]の要素を取得
		const elements = document.formOfSearch.searchWord

		// 選択されたラジオボタンのvalueをselectValueに代入
		var selectValue = undefined
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].checked){
				selectValue = elements[i].value
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
		if (searchType !== undefined && searchTerm !== "") {
			const res = await fetch(`/api/search/${searchType}/${searchTerm}`)
			const searchData = await res.json()

			// 取得したデータを「state(data)」にセット
			setData(searchData)

			// エラーメッセージの非表示
			setAlert(false)

			// 検索ボックスの表示処理
			showBox()
		} else {
			// エラーメッセージの表示
			setAlert(true)
		}

	}

	return (
		<>
			{/***** 1.検索エリア表示ボタン -- start -- *****/}
				<div
					className={styles.searchAreaBtn}
					onClick={showBox}
				>
					{searchBox ? "検索BOX非表示" : "検索BOX表示"}
				</div>
			{/***** 1.検索エリア表示ボタン -- end -- *****/}

			{/***** 2.検索エリア -- start -- *****/}
				{searchBox && (
					<div className={styles.searchArea}>

						{/**** 2-1.ガイドメッセージ ****/}
						<div className={styles.attention}>
							項目をスクロールして検索ジャンルを選択してキーワードを入力して検索
						</div>

						{/**** 2-2.検索ボックス -- start -- ****/}
							<form name="formOfSearch" className={styles.flex}>

								{/*** 2-2-1.検索種選択ラジオボタン -- start -- ***/}
									<div className={styles.gridRadio}>
										<div className={styles.gridRadioScroll}>
											{searchList.map(item => {
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
											})}
										</div>
									</div>
								{/*** 2-2-1.検索種選択ラジオボタン -- end -- ***/}

								{/*** 2-2-2.つなぎ文字 ***/}
								<span className={styles.additionalText}>で</span>

								{/*** 2-2-3.キーワード入力 -- start -- ***/}
									<div className={styles.gridTextBox}>
										<input
											type="text"
											name="searchInput"
											id="searchInput"
											placeholder="キーワードを入力"
											className={styles.inputTextBox}
										/>
									</div>
								{/*** 2-2-3.キーワード入力 -- end -- ***/}

								{/*** 2-2-4.つなぎ文字 ***/}
								<span className={styles.additionalText}>を</span>

								{/*** 2-2-4.検索ボタン -- start -- ***/}
									<div className={styles.gridTextBox}>
										<input
											type="button"
											onClick={searchTerm}
											value="検索 &rarr;"
											className={styles.inputSearchBtn}
										/>
									</div>
								{/*** 2-2-4.検索ボタン -- end -- ***/}

							</form>
						{/**** 2-2.検索ボックス -- end -- ****/}

						{/**** 2-3.エラーメッセージ ****/}
						{alert && <p className={styles.alert}>項目の選択または入力がされていません。</p>}

					</div>
				)}
			{/***** 2.検索エリア -- end -- *****/}

			{/***** 3.データボックス表示エリア -- start -- *****/}

				{/**** 3-1.データボックス ****/}
				{data && (
					data.map(item => (
						<DataBox
							d={item}
							key={`searchOf${item.data.id}`}
						/>
					))
				)}

				{/**** 3-2.エラーメッセージ ****/}
				{!data[0] && <p className={styles.alert}>データが存在しません。</p>}

			{/***** 3.データボックス表示エリア -- end -- *****/}

		</>
	)
}
