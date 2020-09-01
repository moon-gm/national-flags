import '../styles/globals.scss'
import Head from 'next/head'
import Link from 'next/link'

const Layout = ({children}) => {

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
						National Flags
					</Link>
				</header>

				{/* メインエリア */}
				<main className="mainArea">{children}</main>

				{/* フッターエリア */}
				<footer className="footerArea">Powered by Next.js</footer>
			</div>
		</>
	)
}

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
export default MyApp
