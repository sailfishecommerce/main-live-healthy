import Head from 'next/head'

import type { productType } from '@/typings/types'

interface Props {
  product: productType
}

export default function ProductMeta({ product }: Props) {
  const productImage =
    typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0].file.url

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="google-site-verification"
        content="jzOTMxF7oUbLPiv-axyDSRh7yVdltNu-gP2gKfcBIpc"
      />
      <title>Buy {product.name} | Live healthy store</title>
      <meta name="description" content={product.meta_title} />
      {/* open graph */}
      <meta property="og:site_name" content="Livehealthy store" />
      <meta property="og:type" content="product" />
      <meta property="og:title" content={product.name} />
      <meta
        property="og:url"
        content={`https://livehealthy.hk/product/${product.slug}`}
      />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
      <meta
        property="og:image"
        content="http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
      />
      <meta property="og:price:amount" content={`${product.sale_price}`} />
      <meta property="og:price:currency" content="HKD" />

      {/* Twitter meta */}
      <meta name="twitter:site" content="@https://livehealthy.hk" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:url"
        content={`https://livehealthy.hk/product/${product.slug}`}
      />
      <meta name="twitter:image" content={productImage} />
      <meta name="twitter:description" content={product.meta_title} />
      <meta name="twitter:title" content={`Buy ${product.name}`} />
      {product?.tags && <meta name="keywords" content={product.tags[0]} />}

      <script id="productLDJSon" type="application/ld+json">
        {`{
            "@context":"https://schema.org",
            "@type":"Product",
            "name":"${product.name}",
            "description":"${product.description}",      
            "image":"${productImage}",
            "url":"https://livehealthy.hk/product/${product.slug}",        
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${product?.rating}",
              "reviewCount": "${product?.review_rating}"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue":"${product?.rating}",
                "bestRating":"${product?.review_rating}"
                },
              "author":{
                "@type":"Organization",
                "name":"Live healthy",
                "url":"https://livehealthy.hk/",
                "logo": "http://res.cloudinary.com/verrb-inc/image/upload/v1656462729/live-healthy-store/logo_ynasny.webp"
              }
            },
            "brand":{
              "@type":"Brand",
              "name":"${product.vendor}"
            },                  
            "sku":"${product?.sku}",
            "offers": {
              "@type": "Offer",
              "url":"https://livehealthy.hk/product/${product.slug}",        
              "priceValidUntil": "2024-12-31",
              "availability": "https://schema.org/InStock",
              "price":"${product?.sale_price}",
              "priceCurrency": "HKD"
            }
          }
        `}
      </script>
    </Head>
  )
}
