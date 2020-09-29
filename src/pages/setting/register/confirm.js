import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import inputData from '../../../data/inputData'
import styles from '../../../styles/pages/register.module.scss'


export default function Confirm(state) {

	// -------------------- state定義 --------------------

	const [inputCount, setInputCount] = useState(state.inputCount) // 複数入力項目の個数設定

	// -------------------- ルーターの定義 --------------------

	const router = useRouter() // フォーム送信時のaction代わりに使用


	// -------------------- 設定値定義 --------------------

	const inputLists = inputData // インプット項目の設定値


	// -------------------- Function定義 --------------------

	// ***** ■ データ送信時の処理 ■ *****
	async function handleSubmit() {

		// form要素取得
		const form = document.formOfRegister

		// form内のvalue取得してdataに挿入
		const data = {}
		inputLists.map(item => {

			// 追加入力項目がある場合
			if (item.add) {
				data[item.id] = form[item.id].value
				for (let i = 2; i < 11; i++) {
					if (form[`${item.id}${i}`]) {
						data[`${item.id}${i}`] = form[`${item.id}${i}`].value
					}
				}
			}

			// 追加入力項目がない場合
			else {
				data[item.id] = form[item.id].value
			}

		})

		// 追加入力項目の個数をsessionStorageに保存
		data['count'] = sessionStorage.getItem('count')

		// 新規データ追加の場合
		if (sessionStorage.getItem('registerType') === 'new') {
			// APIを叩いてdataをPOSTでサーバに送信
			await fetch('/api/register/new', {
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
		}

		// データ変更の場合
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
		}

		// sessionStorageの内容削除
		sessionStorage.clear()
	}


	// ***** ■ 複数の入力項目を作成する処理 ■ *****
	function createInput(id) {
		let plusInput = []
		for (let i = 2; i < state.inputCount ; i++) {
			plusInput[i] = (
				<React.Fragment key={`${id}${i}`}>
					<input
						type="hidden"
						id={`${id}${i}`}
						name={`${id}${i}`}
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
			plusDisplay[i] = (
				<tr key={`open_${id}${i}`}>
					<th className={styles.displayList}>
						{name}/{i}個目
					</th>
					<td id={`open_${id}${i}`} className={styles.displayList}/>
				</tr>
			)
		}
		return plusDisplay
	}


	// -------------------- レンダー後の処理 --------------------

	useEffect(() => {

		// ***** 前ページのインプット内容を反映 *****
		inputLists.map(list => {

			// 追加項目がある場合
			if (list.add) {
				// sessionStorageの内容を取得
				var sessionData = sessionStorage.getItem(list.id)

				// formにデータを挿入
				document.getElementById(list.id).value = sessionData

				// 表示用に反映
				var openId = `open_${list.id}`
				document.getElementById(openId).textContent = sessionData

				// 追加項目の処理
				for (let i = 2; i < state.inputCount; i++) {

					// sessionStorageの内容を取得
					var addKey = `${list.id}${i}`
					var addSessionData = sessionStorage.getItem(addKey)

					// formにデータを挿入
					document.getElementById(addKey).value = addSessionData

					// 表示用に反映
					var openId = `open_${list.id}${i}`
					document.getElementById(openId).textContent = addSessionData
				}
			}

			// 追加項目がない場合
			else {
				// sessionStorageの内容を取得
				var sessionData = sessionStorage.getItem(list.id)

				// formにデータを挿入
				document.getElementById(list.id).value = sessionData

				// 表示用に反映
				var openId = `open_${list.id}`
				document.getElementById(openId).textContent = sessionData
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
					{inputLists.map(list => {
						// 追加項目がある場合
						if (list.add) {
							return (
								<React.Fragment key={list.id}>
									<tr>
										<th className={styles.displayList}>
											{list.name}/1個目
										</th>
										<td id={`open_${list.id}`} className={styles.displayList}/>
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
									<td id={`open_${list.id}`} className={styles.displayList}/>
								</tr>
							)
						}
					})}
				</tbody>
			</table>

			{/* フォームに値をセット（非表示） */}
			<form name="formOfRegister" id="formOfRegister">
				{inputLists.map(list => {

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
				<input type="button"  value="データ登録" onClick={handleSubmit} className={styles.commonBtn}/>
			</form>

		</div>
	)
}

