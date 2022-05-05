import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

import { mediaStyles } from '@/lib/media'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Common meta */}
          <meta
            name="description"
            content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping"
          />
          <meta name="application-name" content="Live healthy Stores" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Live healthy stores"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#5468ff" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#5468ff" />

          {/* Icons */}
          <link
            rel="apple-touch-icon"
            href="/static/icons/apple-touch-icon.png"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/icon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/icon-32x32.png"
          />
          <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#5468ff"
          />
          <link rel="manifest" href="/site.webmanifest" />

          {/* OG meta */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Live healthy stores" />
          <meta
            property="og:description"
            content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping."
          />
          <meta property="og:site_name" content="Live healthy stores" />
          <meta property="og:url" content="https://new-commerce.vercel.app" />
          <meta
            property="og:image"
            content="https://new-commerce.vercel.app/static/images/socials/logo.webp"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter meta */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://new-commerce.vercel.app" />
          <meta name="twitter:title" content="Live healthy stores" />
          <meta
            name="twitter:description"
            content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping."
          />
          <meta
            name="twitter:image"
            content="https://new-commerce.vercel.app/static/images/socials/logo.webp"
          />

          {/* Fonts */}
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

          {/* Media styles */}
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
