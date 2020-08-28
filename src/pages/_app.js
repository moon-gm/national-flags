import '../styles/globals.scss'
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <>
      {/* ヘッド情報 */}
      <Head>
        <title>National Flags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ヘッダーエリア */}
      <header>National Flags</header>

      {/* メインエリア */}
      <main>{children}</main>

      {/* フッターエリア */}
      <footer>Powered by National Flags</footer>
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
