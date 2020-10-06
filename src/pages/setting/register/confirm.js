import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/pages/register.module.scss'

// 各種データ
import inputData from '../../../data/inputData' // インプット項目の設定値

export default function Confirm(state) {

	// -------------------- 変数定義 --------------------

	const router = useRouter() // フォーム送信時のaction代わりに使用


	// -------------------- Function定義 --------------------

	// ***** ■ データ送信時の処理 ■ *****
	async function handleSubmit() {

		// 1.form要素取得
		const form = document.formOfRegister

		// 2.form内のvalue取得してdataに挿入
		const data = {}
		inputData.map(item => {

			// 2-1.追加入力項目がある場合
			if (item.add) {
				data[item.id] = form[item.id].value
				for (let i = 2; i < 11; i++) {
					let id = `${item.id}${i}`
					if (form[id]) {
						data[id] = form[id].value
					}
				}
			}

			// 2-2.追加入力項目がない場合
			else {
				data[item.id] = form[item.id].value
			}

		})

		// 3.セッションに保存
		data['count'] = sessionStorage.getItem('count') // 追加項目の個数

		// 4.API実行 > 4-1.新規データ追加の場合
		if (sessionStorage.getItem('registerType') === 'new') {
			// APIを叩いてdataをPOSTでサーバに送信
			await fetch('/api/register/new', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(data)
			})

			// レスポンスがOKなら画像登録画面に遷移
			.then((res) => {
				if (res.ok) {
					router.push('/setting/register/upload')
				}
			})
		}

		// 4.API実行 > 4-2.データ変更の場合
		else if (sessionStorage.getItem('registerType') === 'update') {
			// APIを叩いてdataをPOSTでサーバに送信
			await fetch('/api/register/update', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(data)
			})

			// レスポンスがOKなら完了画面に遷移
			.then((res) => {
				if (res.ok) {
					router.push('/setting/register/complete')
				}
			})

			// セッションの全内容削除
			sessionStorage.clear()
		}
	}


	// ***** ■ 複数の入力項目を作成する処理 ■ *****
	function createInput(id) {
		let plusInput = []
		for (let i = 2; i < state.inputCount ; i++) {
			let idPlusNum = `${id}${i}`
			plusInput[i] = (
				<React.Fragment key={idPlusNum}>
					<input
						type="hidden"
						id={idPlusNum}
						name={idPlusNum}
					/>
				</React.Fragment>
			)
		}
		return plusInput
	}


	// ***** ■ 複数の入力項目を作成する処理 ■ *****
	function createDisplay(id, name) {
		let plusDisplay = []
		for (let i = 2; i < state.inputCount ; i++) {
			let idPlusNum = `open_${id}${i}`
			plusDisplay[i] = (
				<tr key={idPlusNum}>
					<th className={styles.displayList}>
						{name}/{i}個目
					</th>
					<td
						id={idPlusNum}
						className={styles.fontSize}
					/>
				</tr>
			)
		}
		return plusDisplay
	}


	// -------------------- レンダー後の処理 --------------------

	useEffect(() => {

		// ***** 1.インプット項目に入力内容を反映する処理 *****
		function reflectValue(id) {
			// sessionStorageの内容を取得
			let inputId = id
			let sessionData = sessionStorage.getItem(inputId)

			// formにデータを挿入
			document.getElementById(inputId).value = sessionData

			// 表示用に反映
			let openId = `open_${inputId}`
			document.getElementById(openId).textContent = sessionData
		}

		// ***** 2.前ページのインプット内容を反映 *****
		inputData.map(list => {

			// 追加項目がある場合
			if (list.add) {
				// データ反映処理
				reflectValue(list.id)

				// 追加項目の処理
				for (let i = 2; i < state.inputCount; i++) {
					// データ反映処理
					reflectValue(`${list.id}${i}`)
				}
			}

			// 追加項目がない場合
			else {
				// データ反映処理
				reflectValue(list.id)
			}

		})

	}, [])

	// -------------------- 入力データを確認するページ --------------------
	return (
		<div className={styles.grid}>
			{/**** ヘッダー部分 -- start -- ****/}
				<h1 className={styles.title}>
					内容確認
				</h1>
			{/**** ヘッダー部分 -- end -- ****/}

			{/* インプット項目の確認表示 */}
			<table className={styles.grid}>
				<tbody>
					{inputData.map(list => {
						// 追加項目がある場合
						if (list.add) {
							return (
								<React.Fragment key={list.id}>
									<tr>
										<th className={styles.displayList}>
											{list.name}/1個目
										</th>
										<td
											id={`open_${list.id}`}
											className={styles.fontSize}
										/>
									</tr>
									{createDisplay(list.id, list.name)}
								</React.Fragment>
							)
						}

						// 追加項目がない場合
						else {
							return (
								<tr key={list.id}>
									<th className={styles.displayList}>
										{list.name}
									</th>
									<td
										id={`open_${list.id}`}
										className={styles.fontSize}
									/>
								</tr>
							)
						}
					})}
				</tbody>
			</table>

			{/* フォームに値をセット（非表示） */}
			<form name="formOfRegister" id="formOfRegister">
				{inputData.map(list => {

					// 追加項目がある場合
					if (list.add) {
						return (
							<React.Fragment key={list.id}>
								<input
									type="hidden"
									id={list.id}
									name={list.id}
									placeholder={list.name}
								/>
								{createInput(list.id)}
							</React.Fragment>
						)
					}

					// 追加項目がない場合
					else {
						return (
							<React.Fragment key={list.id}>
								<input
									type="hidden"
									id={list.id}
									name={list.id}
									placeholder={list.name}
								/>
							</React.Fragment>
						)
					}

				})}
				<Link href="/setting/register/new">
					<button className={styles.commonBtn}>修正する</button>
				</Link>
				<input
					className={styles.commonBtn}
					type="button"
					value="データ登録"
					onClick={handleSubmit}
				/>
			</form>

		</div>
	)
}

