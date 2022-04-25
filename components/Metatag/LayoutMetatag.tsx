import Head from "next/head";

export default function LayoutMetatag() {
  return (
    <>
      
      <Head>
        <meta name="robots" content="noindex" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
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
        <link rel="mask-icon" color="#fe6a6a" href="/safari-pinned-tab.svg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="jzOTMxF7oUbLPiv-axyDSRh7yVdltNu-gP2gKfcBIpc"
        />
      </Head>
    </>
  );
}
