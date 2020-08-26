import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

export default async (req, res) => {
    const {query: {favorite}} = req
    try {
        const searchRef = await client.query(
            q.Update(
                q.Paginate(q.Match(q.Index('all_national_data'), favorite)),
                {
                    "data": {
                        "favorite": true
                    }
                }
            )
        )
        // OK時のレスポンス
        res.status(200).json(addfavo.data)
    }

    catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
    }
}