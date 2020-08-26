import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

export default async (req, res) => {
    const {query: {searchTerms}} = req
    try {
        const search = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('all_national_data'),
                        searchTerms
                    )
                ),
                ref => q.Get(ref)
            )
        )
        // OK時のレスポンス
        res.status(200).json(allData.data)
    }

    catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
    }
}