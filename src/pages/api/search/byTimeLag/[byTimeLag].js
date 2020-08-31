import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

export default async (req, res) => {

    // URLクエリ文字を取得
    const {query: {byTimeLag}} = req

    try {
        const search = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('national_data_search_by_time_lag'),
                        byTimeLag
                    )
                ),
                ref => q.Get(ref)
            )
        )
        // OK時のレスポンス
        res.status(200).json(search.data)
    }

    catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
    }
}
