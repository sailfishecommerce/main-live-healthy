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
            {/* Common meta */}
            <meta name="application-name" content="Live healthy Stores" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
            <meta name="theme-color" content="#95BF11"></meta>
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" />
            <meta name="msapplication-TileColor" content="#5468ff" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="theme-color" content="#5468ff" />

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
            <meta property="og:type" content="website" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Commissioner:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
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
