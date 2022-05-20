import dynamic from 'next/dynamic'

import Breadcrumb from '@/components/Breadcrumb'
import ProductDetail from '@/components/Product/ProductDetail'
import ProductMagnifier from '@/components/Product/ProductMagnifier'
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
    name: hit.name,
    link: null,
    active: true,
  }

  return (
    <div className="flex container mx-auto flex-col items-start">
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <div className="flex flex-col px-4 md:px-0 lg:flex-row md:justify-start">
        <ProductMagnifier product={hit} />
        <ProductDetail product={hit} />
        <ProductOffers className="md:hidden" />
      </div>
      <ProductReview />
      <div className="mt-6" />
      {hit?.tags && (
        <ProductSlider
          randomColor
          title="Customers also purchased"
          productClassName="border border-gray-200 mr-6 rounded-lg"
          query={`tags:${hit.tags[0]}`}
          indexId="customer-also-bought"
        />
      )}
      <ProductSlider
        title="Popular with"
        productName={hit.name}
        productClassName="border border-gray-200 mr-6 rounded-lg"
        randomColor={true}
        query={`vendor:${hit.vendor}`}
        indexId="popular-with-product-slider"
      />
    </div>
  )
}
