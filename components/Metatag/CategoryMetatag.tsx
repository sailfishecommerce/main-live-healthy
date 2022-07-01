import Head from 'next/head'

interface Props {
  slug: string
  type?: string
}

function convertSlug(slug: string) {
  const convertedSlug = slug?.replace(/-/g, ' ').toUpperCase()
  return convertedSlug
}

export default function CategoryMetatag({ slug, type }: Props): JSX.Element {
  const slugHostLink = type ? type : 'collection'
  return (
    <Head>
      <meta
        name="description"
        content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping."
      />
      <meta
        name="keywords"
        content="Vitamins, Supplements, Hair, Beauty, Medical Aids, Health, Perfumes, Skin Care, Baby Products, Smoking Deterrents"
      />
      <meta
        property="og:title"
        content={`${convertSlug(slug)} | Live healthy store`}
        key="ogtitle"
      />
      <meta property="og:type" content="collection" />
      <meta
        property="og:url"
        content={`https://www.livehealthy.hk/${slugHostLink}/${slug}`}
        key="ogurl"
      />
      <meta
        property="og:image"
        content="http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
        key="ogimage"
      />
      <meta
        property="og:image:secure_url"
        content="http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
        key="ogimage"
      />
      <meta property="og:site_name" content="Live healthy" key="ogsitename" />
      <meta
        property="og:description"
        content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping."
        key="ogdesc"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`${convertSlug(slug)} | Live healthy store`}
        key="ogtwtitle"
      />
      <meta
        name="twitter:description"
        content="Imported Australian Goodes in Hong Kong - Buy Imported Vitamins, Supplements, Hair, Beauty, Skin Care, Baby Products, Smoking Deterrents from Live Healthy Store HK. Sensible Prices & Free Shipping."
      />
    </Head>
  )
}
