import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html style={{backgroundImage: "url(/bg-sky.jpg)", backgroundSize: "100% 100%"}}>
        <Head>
			<meta charSet="UTF-8"/>
			<meta name="description" content="National Flags"/>
			<meta property="og:url" content="https://national-flags.vercel.app//"/>
			<meta property="og:title" content="National Flags"/>
			<meta property="og:description" content="FaunaDBを用いて管理の国旗サイト"/>
			<meta property="og:image" content="/favicon.ico"/>
			<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"/>
			<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
			<link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
