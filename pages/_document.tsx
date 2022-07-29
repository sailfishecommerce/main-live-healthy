import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <>
          <Head>
            {/* Icons */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
              rel="icon"
              type="image/png"
              href="/android-chrome-192x192.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/android-chrome-512x512.png"
            />
            <link rel="mask-icon" href="/favicon-32x32.png" color="#5468ff" />
            <link rel="manifest" href="/site.webmanifest" />

            {/* Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              as="font"
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              data-href="https://fonts.googleapis.com/css2?family=Commissioner:wght@300;400;500;600;700&display=optional"
              rel="styleheet"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              color="#fe6a6a"
              href="/safari-pinned-tab.svg"
            />
          </Head>
        </>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
