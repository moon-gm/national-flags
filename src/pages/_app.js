import '../styles/globals.scss'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../components/navigation'

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

				{/* ナビゲーションエリア */}
				<Navigation className="navigationArea"/>

				{/* メインエリア */}
				<main className="mainArea">{children}</main>

				{/* フッターエリア */}
				<footer className="footerArea">Presented by National Flags</footer>
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
