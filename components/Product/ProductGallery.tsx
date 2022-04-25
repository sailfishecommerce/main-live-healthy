import Head from 'next/head'
import Script from 'next/script'

import ProductGalleryView from '@/components/Product/ProductGalleryView'
import type { productType } from '@/typings'

interface Props {
  product: productType
  quickView?: boolean
  isMobile?: boolean
}

export default function ProductGallery({ product, isMobile }: Props) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/src/css/lightgallery.css"
        />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/lib/js/lightgallery.min.js"
        strategy="afterInteractive"
        id="lightgalleryScript"
      />
      <div className="w-full lg:w-2/3 lg:pr-0 lg:pt-4">
        <ProductGalleryView product={product} isMobile={isMobile} />
      </div>
    </>
  )
}
