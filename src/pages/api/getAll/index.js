import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

export default async (req, res) => {

	// リクエストを実行
    try {

		// DBから全てのデータを取得
        const allData = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('all_national_data')
                    )
                ),
                ref => q.Get(ref)
            )
		)

        // OK時のレスポンス
        res.status(200).json(allData.data)
    }

	// エラー時の処理
    catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
	}

}
