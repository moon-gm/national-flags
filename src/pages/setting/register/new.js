import { useEffect, useState } from 'react'
import Link from 'next/link'
import DataBox from '../../../components/dataBox'
import inputData from '../../../data/inputData'
import groupData from '../../../data/groupData'
import styles from '../../../styles/pages/register.module.scss'

export default function New(state) {

	// -------------------- state定義 --------------------

	const [input, setInput] = useState() // inputの内容内容
	const [inputAdd, setInputAdd] = useState(false) // 複数入力項目の表示設定

	// -------------------- データ設定値取得 --------------------

	let isAccess = true // ページへのアクセス設定
	const inputLists = inputData // インプット項目の設定値
	const groupLists = groupData // 地域データの定義値
	const data = {
		data: {
			id: "india", // 国家識別ID（画像名でも使用）
			group: {
				id: "エリア識別ID", // 所在エリア識別ID
				name: "エリア名" // 所在エリア名
			},
			name: {
				katakana: "- 国名 -", // 国名
				official: "- 国名（正式名称） -", // 正式国名
				kanji: ["- 国名（漢字） -", "- 国名（漢字略） -"], // 国名（漢字略字）
				search: ["- 検索ワード -"], // 検索用国名
			},
			language: ["- 言語 -", "- 言語/2個目... -"], // 使用言語（複数の場合のため、配列）
			tribe: ["- 民族", "- 民族/2個目... -"], // 民族
			currency: ["- 通貨 -", "- 通貨/2個目... -"], // 通貨
			capital: '- 首都 -', // 首都
			area: '- 面積(k㎡) -', // 面積(k㎡)
			population: '- 人口（人） -', // 人口（人）
			timeLag: '- 時差（時間） -', // 時差（時間）
			since: '- 建国年（年） -', // 建国年（年）
			origin: {
				name: '- 国名の由来 -', // 国名の由来
				flag: '- 国旗の由来 -' // 国旗の由来
			},
			knowledge: {
				title: '- 豆知識タイトル -', // 豆知識タイトル
				contents: '- 豆知識コンテンツ -' // 豆知識コンテンツ
			}
		}
	}


	// -------------------- Function定義 --------------------

	// ***** ■ 入力項目をsessionStorageに保存する処理 ■ *****
	function changeData() {

		// 地域名を入力で地域IDを自動入力
		const inputValue = document.getElementById('group').value
		groupLists.map(group => {
			if (group.name === inputValue) {
				document.getElementById('groupID').value = group.id
			}
		})

		// 入力項目の値をsessionStorageに保存
		var obj = {}
		inputLists.map(list => {

			// 追加の入力項目がある場合
			if (list.add) {
				var key = list.id
				var value = document.getElementById(key).value
				obj[key] = value
				sessionStorage.setItem(key, value)

				// 追加した入力項目の値を保存
				for (var i = 2; i < state.inputCount+1; i++) {
					if (document.getElementById(`${list.id}${i}`)) {
						var addKey = `${list.id}${i}`
						var addValue = document.getElementById(addKey).value
						obj[addKey] = addValue
						sessionStorage.setItem(addKey, addValue)
					}
				}

			}

			// 追加の入力項目がない場合
			else {
				var key = list.id
				var value = document.getElementById(key).value
				obj[key] = value
				sessionStorage.setItem(key, value)
			}
		})

		// 一応state(input)にも入力内容をセット
		setInput(obj)

		// 追加項目の数も記憶
		sessionStorage.setItem("count", state.inputCount)

		// アクセス状況を記憶
		sessionStorage.setItem("isAccess", true)
	}


	// ***** ■ 複数の入力項目を作成する処理 ■ *****
	function createInput(id, name) {
		var array = []
		for (var i = 2; i < state.inputCount ; i++) {
			array[i] = (
				<input
					type="text"
					id={`${id}${i}`}
					name={`${id}${i}`}
					className={styles.inputList}
					placeholder={`${name}/${i}個目`}
					key={`${id}${i}`}
				/>
			)
		}
		return array
	}


	// -------------------- レンダー後の処理 --------------------

	useEffect(() => {
		// ***** アクセス制限処理 *****
		isAccess = false
		if (sessionStorage.getItem('isAccess') === 'true') {
			isAccess = true
		} else {
			let pass = window.prompt("パスワードを入力してください", "")
			if (pass === process.env.REGISTER_PAGE_ACCESS_PASS) {
				isAccess = true
			}
		}

		if (isAccess) {
			// ***** 先のページから戻った場合、前回のインプット内容を反映 *****
			inputLists.map(list => {

				// 追加の入力項目がある場合
				if (list.add) {
					// sessionStorageの内容を取得
					var sessionData = sessionStorage.getItem(list.id)

					// インプット項目にデータを挿入
					if (sessionData === void 0 || sessionData === "" || sessionData === null ) {
						document.getElementById(list.id).value = ""
					} else {
						document.getElementById(list.id).value = sessionData
					}

					// 追加項目のインプット項目にデータを挿入
					for (var i = 2; i <state.inputCount; i++) {

						// sessionStorageの内容を取得
						var addKey = `${list.id}${i}`
						var addSessionData = sessionStorage.getItem(addKey)

						// インプット項目にデータを挿入
						if (addSessionData === void 0 || addSessionData === "" || addSessionData === null ) {
							document.getElementById(addKey).value = ""
						} else {
							document.getElementById(addKey).value = addSessionData
						}

					}
				}

				// 追加の入力項目がない場合
				else {
					// sessionStorageの内容を取得
					var sessionData = sessionStorage.getItem(list.id)

					// インプット項目にデータを挿入
					if (sessionData === void 0 || sessionData === "" || sessionData === null ) {
						document.getElementById(list.id).value = ""
					} else {
						document.getElementById(list.id).value = sessionData
					}
				}

			})
		}

	}, [])


	// -------------------- データを入力するページ --------------------

	if (isAccess) {
		return (
			<div className={styles.grid}>

				{/**** ヘッダー部分 -- start -- ****/}
					<h1 className={styles.title}>
						表示サンプル
					</h1>
				{/**** ヘッダー部分 -- end -- ****/}
				<DataBox d={data}/>


				{/**** ヘッダー部分 -- start -- ****/}
					<h1 className={styles.title}>
						新規登録
					</h1>
				{/**** ヘッダー部分 -- end -- ****/}

				{/***** インプット項目の設定 -- start -- ******/}
					<table className={styles.grid}>

						{/**** コンテンツ部分 -- start -- ****/}
							<tbody>
								{inputLists.map(list => {

									// *** テキストエリアの場合 ***
									if (list.type === "textArea") {
										return (
											<tr key={list.id} style={{display: "block"}}>
												<th className={styles.displayList}>{list.name}</th>
												<td>
													<textarea id={list.id} name={list.id} placeholder={list.name} className={styles.inputList}/>
												</td>
											</tr>
										)
									}

									// *** 非表示の場合 ***
									else if (list.type === "hidden") {
										return (
											<tr key={list.id} style={{display: "none"}}>
												<td>
													<input type="hidden" id={list.id} name={list.id} placeholder={list.name}/>
												</td>
											</tr>
										)
									}

									// *** セレクトボックスの場合 ***
									else if (list.type === "select") {
										return (
											<tr key={list.id} style={{display: "block"}}>
												<th className={styles.displayList}>{list.name}</th>
												<td>
													<select id={list.id} name={list.id} className={styles.inputList}>
														{groupLists.map(group => {
															return (
																<option
																	value={group.name}
																	id={group.id}
																	name={group.id}
																	key={group.id}
																>
																	{group.name}
																</option>
															)
														})}
													</select>
												</td>
											</tr>
										)
									}

									// *** テキスト入力の場合 ***
									else {
										return (
											<tr key={list.id} style={{display: "block"}}>
												<th className={styles.displayList}>
													{list.name}
													{list.add && state.inputCount < 11 && (
														<button onClick={state.addInput} className={`${styles.commonBtn} ${styles.plusBtn}`}>＋</button>
													)}
												</th>
												<td>
													<input type="text" id={list.id} name={list.id} placeholder={list.name} className={styles.inputList}/>

													{/** 入力項目追加の場合 **/}
													{list.add && state.inputCount > 1 && createInput(list.id, list.name)}
												</td>
											</tr>
										)
									}

								})}
							</tbody>
						{/**** コンテンツ部分 -- end -- ****/}

					</table>
				{/***** インプット項目の設定 -- end -- ******/}

				{/***** 入力内容確認ボタン -- start -- *****/}
					<Link href="/setting/register/confirm">
						<button onClick={changeData} className={styles.commonBtn}>
							確認
						</button>
					</Link>
				{/***** 入力内容確認ボタン -- start -- *****/}

			</div>
		)
	} else {
		return (
			<div className={styles.grid}>
				<h1 className={styles.title}>
					※パスワードが間違っています。
				</h1>
			</div>
		)
	}
}
