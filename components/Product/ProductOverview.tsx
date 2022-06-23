/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

import Breadcrumb from '@/components/Breadcrumb'
import ProductDetail from '@/components/Product/ProductDetail'
import ProductMagnifier from '@/components/Product/ProductMagnifier'
import useProduct from '@/hooks/useProduct'
import breadcrumb from '@/json/breadcrumb.json'

type breadcrumbType = Array<{
  name: string
  link: string | null
  active?: boolean
}>

const ProductOffers = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductOffers' */ '@/components/Product/ProductOffers'
    )
)

const ProductSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductSlider' */ '@/components/Slider/ProductSlider'
    )
)
const ProductReview = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductReview' */ '@/components/Product/ProductReview'
    )
)
export default function ProductOverview({ hit }: any) {
  const breadcrumbItems: breadcrumbType = breadcrumb.product
  breadcrumbItems[2] = {
    name: hit?.name,
    link: null,
    active: true,
  }
  const { getVendorProduct } = useProduct()
  const { data, status } = useQuery(`get-vendor-${hit?.slug}`, () =>
    getVendorProduct(hit.vendor)
  )

  let relatedProducts = []
  let alsoBoughtProducts = []

  if (status === 'success') {
    relatedProducts = data?.data?.results.slice(0, 15)
    alsoBoughtProducts = data?.data?.results.slice(15, 30)
  }

  return (
    <div className="flex container mx-auto flex-col items-start">
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <div className="flex flex-col px-4 md:px-0 lg:flex-row md:justify-start">
        <ProductMagnifier product={hit} />
        <ProductDetail product={hit} />
        <ProductOffers className="md:hidden" />
      </div>
      <ProductReview rating={hit?.rating} />
      <div className="mt-6 px-0 mx-0" />
      {status === 'error' ? (
        'unable to load related products'
      ) : status === 'loading' ? (
        'loading...'
      ) : (
        <>
          <ProductSlider
            randomColor
            products={relatedProducts}
            title="Customers also purchased"
            productClassName="border border-gray-200 mr-6 rounded-lg"
          />
          {data?.data.results.length > 15 && (
            <ProductSlider
              title="Popular with"
              productName={hit?.name}
              products={alsoBoughtProducts}
              productClassName="border border-gray-200 mr-6 rounded-lg"
              randomColor={true}
            />
          )}
        </>
      )}
    </div>
  )
}
