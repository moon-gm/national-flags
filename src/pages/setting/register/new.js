import { useEffect, useState } from 'react'
import Link from 'next/link'
import DataBox from '../../../components/dataBox'
import styles from '../../../styles/pages/register.module.scss'

// 各種データ
import inputData from '../../../data/inputData' // インプット項目の設定値
import groupData from '../../../data/groupData' // 地域データの設定値
import sampleData from '../../../data/sampleData' // 国データのサンプル値

export default function New(state) {

	// -------------------- 変数定義 --------------------

	let isAccess = true // ページへのアクセス設定(要素をレンダリングするため初期値「true」、useEffectで「false」に設定)


	// -------------------- Function定義 --------------------

	// ***** ■ 入力項目をsessionStorageに保存する処理 ■ *****
	function changeData() {

		// 1.地域名を選択で地域IDを自動入力
		const inputValue = document.getElementById('group').value
		groupData.map(group => {
			if (group.name === inputValue) {
				document.getElementById('groupID').value = group.id
			}
		})

		// 2.入力項目の値をsessionStorageに保存
		const obj = {}
		function setValueToSession(id) {
			let key = id
			let value = document.getElementById(key).value
			obj[key] = value
			sessionStorage.setItem(key, value)
		}
		inputData.map(list => {

			// 2-1.追加の入力項目がある場合
			if (list.add) {
				// セッションにデータ保存の処理
				setValueToSession(list.id)
				// 追加した入力項目の値を保存
				for (let i = 2; i < state.inputCount+1; i++) {
					let id = `${list.id}${i}`
					if (document.getElementById(id)) {
						// セッションにデータ保存の処理
						setValueToSession(id)
					}
				}
			}

			// 2-2.追加の入力項目がない場合
			else {
				// セッションにデータ保存の処理
				setValueToSession(list.id)
			}
		})

		// 3.セッションに保存
		sessionStorage.setItem("count", state.inputCount) // 追加項目の数
		sessionStorage.setItem("isAccess", true) // アクセス許可
	}


	// ***** ■ 複数の入力項目を作成する処理 ■ *****
	function createInput(id, name) {
		let array = []
		for (let i = 2; i < state.inputCount ; i++) {
			let idPlusNum = `${id}${i}`
			array[i] = (
				<input
					type="text"
					id={idPlusNum}
					name={idPlusNum}
					className={styles.inputList}
					placeholder={`${name}/${i}個目`}
					key={idPlusNum}
				/>
			)
		}
		return array
	}


	// -------------------- レンダー後の処理 --------------------

	useEffect(() => {

		// ***** 1.アクセス制限処理 *****
		isAccess = false
		if (sessionStorage.getItem('isAccess') === 'true') {
			isAccess = true
		} else {
			let pass = window.prompt("パスワードを入力してください", "")
			if (pass === process.env.REGISTER_PAGE_ACCESS_PASS) {
				isAccess = true
			}
		}

		// ***** 2.アクセス許可時処理 *****
		if (isAccess) {

			// **** 2-1.インプット項目に入力内容を反映する処理 ****
			function reflectValue(id) {
				// sessionStorageの内容を取得
				let inputId = id
				let sessionData = sessionStorage.getItem(inputId)

				// インプット項目にデータを挿入
				if (sessionData === void 0 || sessionData === "" || sessionData === null ) {
					document.getElementById(inputId).value = ""
				} else {
					document.getElementById(inputId).value = sessionData
				}
			}

			// **** 2-2.先のページから戻った場合、前回のインプット内容を反映 ****
			inputData.map(list => {

				// 追加の入力項目がある場合
				if (list.add) {
					// データ反映処理
					reflectValue(list.id)

					// 追加項目のインプット項目にデータを挿入
					for (let i = 2; i <state.inputCount; i++) {
						// データ反映処理
						reflectValue(`${list.id}${i}`)
					}
				}

				// 追加の入力項目がない場合
				else {
					// データ反映処理
					reflectValue(list.id)
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
				<DataBox d={sampleData}/>


				{/**** ヘッダー部分 -- start -- ****/}
					<h1 className={styles.title}>
						新規登録
					</h1>
				{/**** ヘッダー部分 -- end -- ****/}

				{/***** インプット項目の設定 -- start -- ******/}
					<table className={styles.grid}>

						{/**** コンテンツ部分 -- start -- ****/}
							<tbody>
								{inputData.map(list => {

									// *** テキストエリアの場合 ***
									if (list.type === "textArea") {
										return (
											<tr key={list.id} style={{display: "block"}}>
												<th className={styles.displayList}>{list.name}</th>
												<td>
													<textarea
														id={list.id}
														name={list.id}
														className={styles.inputList}
														placeholder={list.name}
													/>
												</td>
											</tr>
										)
									}

									// *** 非表示の場合 ***
									else if (list.type === "hidden") {
										return (
											<tr key={list.id} style={{display: "none"}}>
												<td>
													<input
														type="hidden"
														id={list.id}
														name={list.id}
														placeholder={list.name}
													/>
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
													<select
														id={list.id}
														name={list.id}
														className={styles.inputList}
													>
														{groupData.map(group => {
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
														<button
															onClick={state.addInput}
															className={`${styles.commonBtn} ${styles.plusBtn}`}
														>
															＋
														</button>
													)}
												</th>
												<td>
													<input
														type="text"
														id={list.id}
														name={list.id}
														className={styles.inputList}
														placeholder={list.name}
													/>

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
						<button
							onClick={changeData}
							className={styles.commonBtn}
						>
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
					パスワードが間違っています。
				</h1>
			</div>
		)
	}
}
