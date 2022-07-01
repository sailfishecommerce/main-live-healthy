import Head from 'next/head'
import { memo } from 'react'

function ProductMetatagComponent({ pageProduct }: any) {
  const productDescription = pageProduct.description.replace(
    /<\/?[^>]+(>|$)/g,
    ''
  )
  return (
    <Head>
      {pageProduct?.tags && (
        <meta name="keywords" content={pageProduct.tags[0]} />
      )}
      <meta name="description" content={productDescription} />
      <meta
        property="og:title"
        content={pageProduct.meta_title}
        key="ogtitle"
      />
      <meta property="og:type" content="product" />
      <meta property="og:price:amount" content={pageProduct.sale_price} />
      <meta
        property="og:url"
        content={`https://www.livehealthy.hk/product/${pageProduct.slug}`}
        key="ogurl"
      />
      <meta property="og:price:currency" content="HKD" />
      <meta
        property="og:image"
        content={pageProduct.images[0].file.url}
        key="ogimage"
      />
      <meta
        property="og:image:secure_url"
        content={pageProduct.images[0].file.url}
        key="ogimage"
      />
      <meta property="og:site_name" content="Live healthy" key="ogsitename" />
      <meta
        property="og:description"
        content={productDescription}
        key="ogdesc"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={pageProduct.meta_title}
        key="ogtwtitle"
      />
      <meta name="twitter:description" content={productDescription} />
    </Head>
  )
}

const ProductMetatag = memo(ProductMetatagComponent)

export default ProductMetatag
