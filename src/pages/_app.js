import '../styles/globals.scss'
import Head from 'next/head'
import Link from 'next/link'

class Layout extends React.Component {

	// ***** ■ 初期設定 ■ *****
	constructor(props){
		super(props)
		this.state = {
			inputCount: 2 // 入力項目の個数設定
		}
	}

	// ***** ■ レンダー後の処理 ■ *****
	componentDidMount() {
		if (sessionStorage.getItem('count') !== null) {
			const sessionData = Number(sessionStorage.getItem('count'))
			this.setState({inputCount: sessionData})
		}
	}

	// ***** ■ 入力欄を追加するボタン(＋)の処理 ■ *****
	addInput() {

		// state(inputCount)を初期値にカウントアップ
		let count = this.state.inputCount
		count++
		this.setState({inputCount: count})

	}

	render(){

		/***** childrenの設定 *****/

		// childrenに渡すPropsの設定
		const additionalProps = {
			inputCount: this.state.inputCount,
			addInput: this.addInput.bind(this),
		}

		// 子要素を再生成してPropsを渡す設定
		const newChildren = React.cloneElement(this.props.children, additionalProps);


		return (
			<>
				{/* ヘッド設定 */}
				<Head>
					<title>National Flags</title>
				</Head>

				{/* コンテンツ設定 */}
				<div className="container">

					{/* ヘッダーエリア */}
					<header className="headerArea">
						<Link href="/">
							<a>National Flags</a>
						</Link>
					</header>

					{/* メインエリア */}
					<main className="mainArea">{newChildren}</main>

					{/* フッターエリア */}
					<footer className="footerArea">Powered by Next.js</footer>

				</div>
			</>
		)
	}
}

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
export default MyApp
