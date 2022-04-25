import Head from "next/head";
import { memo } from "react";

interface Props {
  pageProduct: {
    description: string;
    meta_title: string;
    price: string;
    slug: string;
    images: {
      file: {
        url: string;
      };
    }[];
    tags: string[];
  };
}

 function ProductMetatagComponent({ pageProduct }: Props) {
  const productDescription = pageProduct.description.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );
  return (
    <Head>
      {pageProduct.tags && (
        <meta name="keywords" content={pageProduct.tags[0]} />
      )}
      <meta name="description" content={productDescription} />
      <meta
        property="og:title"
        content={pageProduct.meta_title}
        key="ogtitle"
      />
      <meta property="og:type" content="product" />
      <meta property="og:price:amount" content={pageProduct.price} />
      <meta
        property="og:url"
        content={`https://www.livehealthy.hk/products/${pageProduct.slug}`}
        key="ogurl"
      />
      <meta property="og:price:currency" content="USD" />
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
  );
}

const ProductMetatag = memo(ProductMetatagComponent);

export default ProductMetatag;
