import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/pages/register.module.scss'

export default function Upload() {

	// -------------------- state定義 --------------------

	const [fileName, setFileName] = useState() // ファイル名を設定
	const [tmpName, setTmpName] = useState() // オリジナルファイル名を設定
	const [isTmpFile, setIsTmpFile] = useState(false) // 一時ファイルの取得状況を設定


	// -------------------- 変数定義 --------------------

	const router = useRouter() // フォーム送信時のaction代わりに使用


	// -------------------- Function定義 --------------------

	// ***** ■ FormDataを作成する処理 ■ *****
	function createFormData() {

		// 1.画像ファイルを取得
		const element = $('#file')
		const file = $(element).prop('files')[0]

		// 2.フォームを取得してdataに画像ファイルを追加
		const data = new FormData()
		data.append('fileName', fileName)
		data.append('file', file)

		return data
	}

	// ***** ■ ファイルをサーバにアップロードする処理 ■ *****
	　async function uploadFile() {

		// 1.FormDataを設定
		const data = createFormData()

		// 2.APIをfetchしてサーバに画像を保存（一時アップロード画像は削除）
		await fetch('/api/register/upload', {
			method: 'POST',
			body: data
		})
		.then((res) => {
			// 成功時の処理
			if (res.ok) {
				// セッションを全てクリアして完了画面へ遷移
				sessionStorage.clear()
				router.push('/setting/register/complete')
			}
		})
	}


	// ***** ■ ファイルをサーバに一時アップロードし、プレビュー表示する処理 ■ *****
	async function uploadTmp() {

		// 1.FormDataを設定
		const data = createFormData()

		// 2.Ajaxで一時画像をtmpフォルダにアップロード
		await $.ajax({
			url: '/api/register/uploadTmp',
			type: 'POST',
			dataType: 'json', // レスポンスのテータ型設定
			data: data, // 送信するデータの設定
			processData: false,
			contentType: false // 「multipart/form-data」はformタグで設定
		})
		.done((res) => {
			// 成功時の処理
			// 一時アップロードのファイルをプレビュー表示させる処理
			setIsTmpFile(true)
			const getFileName = document.getElementById('file').value
			const splitName = getFileName.split('\\')
			setTmpName(splitName[2])
			console.log(res)
		})
		.fail((errorThrown) => {
			// エラー時の処理
			console.log(errorThrown)
		})

	}


	// -------------------- レンダー後の処理 --------------------

	useEffect(() => {

		// 1.セッションの「識別ID」からファイル名を取得
		const id = sessionStorage.getItem('id')
		if(id) {
			setFileName(id)
		}

	}, [])


	// -------------------- データを入力するページ --------------------

	return (
		<div className={styles.grid}>

			{/**** ヘッダー部分 -- start -- ****/}
				<h1 className={styles.title}>
					画像アップロード
				</h1>
			{/**** ヘッダー部分 -- end -- ****/}

			{/***** インプット項目の設定 -- start -- ******/}
				<table className={styles.grid}>

					{/**** コンテンツ部分 -- start -- ****/}
						<tbody>

							<tr style={{display: "black"}}>
								<th className={styles.displayList}>
									画像
									<form name="formOfFile" encType="multipart/form-data">
										<label htmlFor="file" className={styles.fileBtn}>
											ファイルを選択
										</label>
										<input
											type="file"
											id="file"
											name="file"
											accept="image/png"
											onChange={uploadTmp}
											className={styles.inputFile}
										/>
									</form>
								</th>
								<td className={`${styles.inputLists} ${styles.verticalAlign} ${styles.fontSize}`}>
									{tmpName && tmpName}
								</td>
							</tr>

						</tbody>
					{/**** コンテンツ部分 -- end -- ****/}

				</table>
			{/***** インプット項目の設定 -- end -- ******/}

			{/***** 画像サンプル表示の設定 -- start -- ******/}
				<div>
					<p className={styles.sampleImageTitle}>
						画像タイトル：「{fileName ? fileName : '選択されていません'}.png」<br/>
						※画像タイトルは前ページで入力の識別IDが適用されます。
					</p>
					{isTmpFile &&
						(
							<img
								id="sampleFile"
								alt="アップロード画像を表示"
								src={`/tmp/${fileName}.png`}
								className={styles.sampleImage}
							/>
						)
					}
					{!isTmpFile &&
						(
							<img
								id="sampleFile"
								alt="アップロード画像を表示"
								src="/uploadSample.png"
								className={styles.sampleImage}
							/>
						)
					}

				</div>
			{/***** 画像サンプル表示の設定 -- end -- ******/}

			{/***** 画像破棄ボタン -- start -- *****/}
				<button
					onClick={() => location.reload()}
					className={styles.commonBtn}
				>
					画像を変える
				</button>
			{/***** 画像破棄ボタン -- start -- *****/}

			{/***** 入力内容確認ボタン -- start -- *****/}
				<button
					onClick={uploadFile}
					className={styles.commonBtn}
				>
					画像を登録する
				</button>
			{/***** 入力内容確認ボタン -- start -- *****/}

		</div>
	)
}
