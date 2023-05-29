import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta title="Slide Template Generator for Papers" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="icon" href="" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
