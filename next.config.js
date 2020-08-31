// nodeの設定など
const withSass = require('@zeit/next-sass');
module.exports = withSass({
	cssModules: true,
	// ローカル開発時ここにDBアクセスキーを入力し、コメントアウトを外す(KeyはPUSHしないこと)
	// env: {
	// 	"FAUNADB_SECRET_KEY_NATIONAL_FLAGS": ""
	// }
})
