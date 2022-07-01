import Head from 'next/head'

import type { productType } from '@/typings/types'

interface Props {
  product: productType
}

export default function ProductMeta({ product }: Props) {
  return (
    <Head>
      <script id="productLDJSon" type="application/ld+json">
        {`{
            "@context":"https://schema.org",
            "@type":"Product",
            "name":"${product.name}",
            "description":"${product.description}",      
            "image":"${product.images[0]}",
            "url":"https://livehealthy.hk/product/${product.slug}",        
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${product.rating}",
              "reviewCount": "${product.review_rating}"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue":"${product.rating}",
                "bestRating":"${product.review_rating}"
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
            "sku":"${product.sku}",
            "offers": {
              "@type": "Offer",
              "url":"https://livehealthy.hk/product/${product.slug}",        
              "priceValidUntil": "2024-12-31",
              "availability": "https://schema.org/InStock",
              "price":"${product.sale_price}",
              "priceCurrency": "HKD"
            }
          }
        `}
      </script>
      <meta title={product.meta_title} />
      <meta name="description" content={product.description} />
    </Head>
  )
}
