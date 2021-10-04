import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html style={{ background: "linear-gradient(rgba(0, 112, 243, 0.5), rgba(0, 112, 243, 0.3))" }}>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="description" content="National Flags" />
                    <meta property="og:url" content="https://national-flags.vercel.app//" />
                    <meta property="og:title" content="National Flags" />
                    <meta property="og:description" content="FaunaDBを用いて管理の国旗サイト" />
                    <meta property="og:image" content="/favicon.ico" />
                    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                    <link rel="icon" href="/favicon.ico" />
                    {/* jQuery導入 */}
                    <script
                        src="https://code.jquery.com/jquery-3.5.1.js"
                        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
