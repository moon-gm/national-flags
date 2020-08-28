import '../styles/globals.scss'
import Head from 'next/head'
import Functions from '../functions/fetchAPI'

class Layout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nationalData: undefined
    }
    this.funcs = {
      getAll: Functions.getAll.bind(this),
      searchTerm: Functions.searchTerm.bind(this),
      selectGroup: Functions.selectGroup.bind(this),
    }
  }
  render() {
    /***** childrenの設定 *****/
		// childrenに渡すPropsの設定
		const additionalProps = {
			nationalData: this.state.nationalData,
			funcs: this.funcs,
		}
		// 子要素を再生成してPropsを渡す設定
    const newChildren = React.cloneElement(this.props.children, additionalProps);
    
    return (
      <>
        {/* ヘッド情報 */}
        <Head>
          <title>National Flags</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        {/* ヘッダーエリア */}
        <header className="headerArea">National Flags</header>
  
        {/* メインエリア */}
        <main className="mainArea">{newChildren}</main>
  
        {/* フッターエリア */}
        <footer classNmae="footerArea">Powered by National Flags</footer>
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
