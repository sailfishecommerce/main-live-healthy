/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

import ProductBanner from '@/components/Banners/ProductBanner'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import ProductDescription from '@/components/Product/ProductDescription'
import ProductGalleryDetails from '@/components/Product/ProductGalleryDetails'
import RelatedProductSlider from '@/components/Slider/RelatedProductSlider'
import useSwellProducts from '@/hooks/useSwellProducts'

const ProductReviews = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductReview' */ '@/components/Product/ProductReview'
    )
)

interface ProductOverviewProps {
  pageProduct?: any
}

export default function ProductOverview({ pageProduct }: ProductOverviewProps) {
  const { getProductsInCategory } = useSwellProducts()
  const { data, status } = useQuery('getProductsInCategory', () =>
    getProductsInCategory(pageProduct.product_type)
  )
  return (
    <>
      <ProductBanner />
      <ProductGalleryDetails product={pageProduct} />
      <ProductDescription product={pageProduct} />
      <ProductReviews />
      {status === 'error' ? (
        ''
      ) : status === 'loading' ? (
        <SpinnerRipple />
      ) : (
        <RelatedProductSlider relatedProducts={data.results} />
      )}
    </>
  )
}
