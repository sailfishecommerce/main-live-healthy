import Breadcrumb from '@/components/Breadcrumb'
import ProductDetail from '@/components/Product/ProductDetail'
import ProductMagnifier from '@/components/Product/ProductMagnifier'
import ProductOffers from '@/components/Product/ProductOffers'
import ProductReview from '@/components/Product/ProductReview'
import ProductSlider from '@/components/Slider/ProductSlider'
import breadcrumb from '@/json/breadcrumb.json'

type breadcrumbType = Array<{
  name: string
  link: string | null
  active?: boolean
}>

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
        <ProductOffers className="" />
      </div>
      <ProductReview />
      <div className="mt-6" />
      <ProductSlider
        randomColor
        title="Customers also purchased"
        productClassName="border border-gray-200 mr-6 rounded-lg"
      />
      <ProductSlider
        title="Popular with"
        productName={hit.name}
        productClassName="border border-gray-200 mr-6 rounded-lg"
        randomColor={true}
      />
    </div>
  )
}
