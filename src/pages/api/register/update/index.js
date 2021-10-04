// todo クエリをReplaceに変更
import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

// インプット項目データ
import inputData from '../../../../config/inputData.json'

export default async (req, res) => {

	// リクエストを実行
    try {

		// 複数項目の値を入れる変数
		let array = []

		// 複数入力ある場合の項目の値定義処理
		function createItem(id) {
			let item = array[id] = []
			item.push(req.body[id])

			for (let i = 2; i < req.body['count']; i++){
				let name = `${id}${i}`
				item.push(req.body[name])
			}
		}

		// 複数項目のデータ処理実行
		inputData.map(item => {
			createItem(item.id)
		})

		// 実際に挿入するデータ定義
		const data = {
			data: {
				id: req.body['id'], // 国家識別ID（画像名でも使用）
				group: {
					id: req.body['groupID'], // 所在エリア識別ID
					name: req.body['group'] // 所在エリア名
				},
				name: {
					katakana: req.body['nationalName'], // 国名
					official: req.body['nationalNameOfficial'], // 正式国名
					kanji: [req.body['nationalNameKanji'], req.body['nationalNameKanjiOmit']], // 国名（漢字略字）
					search: array['nationalNameSearch'], // 検索用国名
				},
				language: array['language'], // 使用言語（複数の場合のため、配列）
				tribe: array['tribe'], // 民族
				currency: array['currency'], // 通貨
				capital: req.body['capital'], // 首都
				area: req.body['area'], // 面積(k㎡)
				population: req.body['population'], // 人口（人）
				timeLag: req.body['timeLag'], // 時差（時間）
				since: req.body['since'], // 建国年（年）
				origin: {
					name: req.body['originName'], // 国名の由来
					flag: req.body['originFlag'] // 国旗の由来
				},
				knowledge: {
					title: req.body['knowledgeTitle'], // 豆知識タイトル
					contents: req.body['knowledgeContents'] // 豆知識コンテンツ
				}
			}
		}

		// DBデータに新規追加
        const create = await client.query(
			q.Create(q.Collection('national_data'),
				data
			)
        )

        // OK時のレスポンス
        res.status(200).json(create.data)
	}

	// エラー時の処理
	catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
	}

}
