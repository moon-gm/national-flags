import {useState} from 'react'
import DataBox from '../components/dataBox'

export default function Home() {

	// ----- 取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

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
	}

	return (
		<>
			{/* 検索エリア */}
			<div className="searchArea">
				<form name="formOfSearch">
					{
						searchList.map(item => {
							return (
								<label>
									<input
										type="radio"
										name="searchWord"
										id={item.id}
										value={item.id}
									/>
									{item.name}
								</label>
							)
						})
					}
					<input type="text" name="searchInput" id="searchInput" placeholder="検索種別にチェックを入れて入力"/>
					<input type="button" onClick={searchTerm} value="Search"/>
				</form>
			</div>

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
