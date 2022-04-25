import Head from "next/head";

interface Props {
  collection: any;
}

export default function CategoryMetatag({ collection }: Props): JSX.Element {
  return (
    <Head>
      <meta name="description" content={collection.meta_description} />
      <meta name="keywords" content={collection.name} />
      <meta name="description" content={collection.meta_description} />
      <meta property="og:title" content={collection.meta_title} key="ogtitle" />
      <meta property="og:type" content="collection" />
      <meta
        property="og:url"
        content={`https://www.livehealthy.hk/shop/${collection.slug}`}
        key="ogurl"
      />
      <meta
        property="og:image"
        content={collection.images[0].file.url}
        key="ogimage"
      />
      <meta
        property="og:image:secure_url"
        content={collection.images[0].file.url}
        key="ogimage"
      />
      <meta property="og:site_name" content="Live healthy" key="ogsitename" />
      <meta
        property="og:description"
        content={collection.meta_description}
        key="ogdesc"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={collection.meta_title}
        key="ogtwtitle"
      />
      <meta name="twitter:description" content={collection.meta_description} />
    </Head>
  );
}
