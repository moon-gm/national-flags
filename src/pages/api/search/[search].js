import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

export default async (req, res) => {

    // URLクエリ文字を取得
	const {query: {search}} = req

	// クエリ文字列を「&」で分ける(クエリ文字：インデックス名&検索文字列)
	const terms = search.split('-')

	// リクエストを実行
    try {

		// キーワード検索でヒットしたデータを取得
        const searchData = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index(terms[0]),
                        terms[1]
                    )
                ),
                ref => q.Get(ref)
            )
		)

        // OK時のレスポンス
        res.status(200).json(searchData.data)
    }

	// エラー時の処理
    catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
    }
}
