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
              as="font"
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              data-href="https://fonts.googleapis.com/css2?family=Commissioner:wght@300;400;500;600;700&display=optional"
              rel="styleheet"
            />

            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1,viewport-fit=cover"
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
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
            <meta
              name="keywords"
              content="Medicines, Health, Beauty, Hair Colours, Personal Care, ,Confectionery, Veterinary and Pet Care, Medical Aids"
            />
            <meta
              name="google-site-verification"
              content="jzOTMxF7oUbLPiv-axyDSRh7yVdltNu-gP2gKfcBIpc"
            />
            <meta property="og:site_name" content="Live Healthy Store HK" />
            <meta property="og:url" content="https://livehealthy.hk" />
            <meta
              property="og:title"
              content="Welcome to Live healthy Store - Quality Australian Products - Free Shipping to HK"
            />
            <meta property="og:type" content="website" />
            <meta
              name="description"
              content="No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, personal care, confectionery, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, confectionery, quit smoking aids, hair colours, baby food and much more. Owned & operated by HK'ers."
            />
            <meta property="og:image:width" content="1000" />
            <meta property="og:image:height" content="1000" />
            <meta
              property="og:image"
              content="http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
            />

            {/* Twitter meta */}
            <meta name="twitter:site" content="@https://livehealthy.hk" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://livehealthy.hk" />
            <meta
              name="twitter:image"
              content="http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
            />
            <meta
              name="twitter:description"
              content="No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, quit smoking aids, hair colours, baby food and much more. Owned &amp; operated by HK'ers."
            />
            <meta
              name="twitter:title"
              content="Welcome to Live Healthy Store HK - Quality Australian Products - Free Shipping to HK"
            />
            <script type="application/ld+json">
              {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url":"https://livehealthy.hk",
            "content":"http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
          }`}
            </script>
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
