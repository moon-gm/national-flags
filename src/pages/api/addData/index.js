import faunadb from 'faunadb'

// DBアクセス設定
const secret = process.env.FAUNADB_SECRET_KEY_NATIONAL_FLAGS
const q = faunadb.query
const client = new faunadb.Client({secret})

// 国データの設定
import nationalDataAll from '../../../data/nationalData'

export default async (req, res) => {

	// リクエストを実行
    try {

		// DBデータの初期化
        const init = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('all_national_data')
                    )
                ),
                ref => q.Delete(ref)
            )
        )

		// DBに「nationalDataAll」から新しくデータを追加
        const addData = await client.query(
            q.Map(
                nationalDataAll,
                q.Lambda('nationalData', q.Create(q.Collection('national_data'), q.Var('nationalData')))
            )
		)

        // OK時のレスポンス
        res.status(200).json(addData.data)
	}

	// エラー時の処理
	catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
	}

}
