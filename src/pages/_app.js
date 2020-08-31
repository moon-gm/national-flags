import '../styles/globals.scss'
import Head from 'next/head'
import Navigation from '../components/navigation'

const Layout = ({children}) => {
	return (
		<>
			{/* ヘッド情報 */}
			<Head>
				<title>National Flags</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* ヘッダーエリア */}
			<header className="headerArea">National Flags</header>

			{/* ナビゲーションエリア */}
			<Navigation/>

			{/* メインエリア */}
			<main className="mainArea">{children}</main>

			{/* フッターエリア */}
			<footer className="footerArea">Presented by National Flags</footer>
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
