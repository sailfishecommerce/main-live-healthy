import Head from "next/head";
import { productType } from "@/types";

interface Props {
  product: productType;
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
            "image":"${product.images[0]?.file?.url}",
            "url":"https://livehealthy.hk/products/${product.slug}",        
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
                "logo": "https://res.cloudinary.com/verrb-inc/image/upload/v1643186694/sailfish/logo_u4xg8w.webp"
              }
            },
            "brand":{
              "@type":"Brand",
              "name":"${product.name}"
            },                  
            "isbn":"${product.id}",
            "sku":"${product.id}",
            "offers": {
              "@type": "Offer",
              "url":"https://livehealthy.hk/products/${product.slug}",        
              "priceValidUntil": "2022-12-31",
              "availability": "https://schema.org/InStock",
              "price":"${product.price}",
              "priceCurrency": "USD"
            }
          }
        `}
      </script>
      <meta title={product.meta_title} />
      <meta name="description" content={product.description} />
    </Head>
  );
}
