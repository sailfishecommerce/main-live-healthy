import Head from 'next/head'
import { memo } from 'react'

function ProductMetatagComponent({ pageProduct }: any) {
  const productImage =
    typeof pageProduct.images[0] === 'string'
      ? pageProduct.images[0]
      : pageProduct.images[0].file.url
  return (
    <Head>
      {pageProduct?.tags && (
        <meta name="keywords" content={pageProduct.tags[0]} />
      )}
      <meta name="description" content={pageProduct.meta_title} />
      <meta property="og:title" content={pageProduct.name} key="ogtitle" />
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
        content={pageProduct.meta_title}
        key="ogdesc"
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:url"
        content={`https://www.livehealthy.hk/product/${pageProduct.slug}`}
      />
      <meta name="twitter:title" content={pageProduct.name} key="ogtwtitle" />
      <meta name="twitter:description" content={pageProduct.meta_title} />
      <meta name="twitter:image" content={productImage} />
    </Head>
  )
}

const ProductMetatag = memo(ProductMetatagComponent)

export default ProductMetatag
