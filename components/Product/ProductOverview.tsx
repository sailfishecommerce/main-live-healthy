/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import Breadcrumb from '@/components/Breadcrumb'
import ProductDetail from '@/components/Product/ProductDetail'
import ProductMagnifier from '@/components/Product/ProductMagnifier'
import ProductPriceView from '@/components/Product/ProductPriceView'
import CustomerReview from '@/components/Reviews/CustomerReview'
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
  const { getVendorProduct } = useProduct()
  const { data, status } = useQuery(`get-vendor-${hit?.slug}`, () =>
    getVendorProduct(hit.vendor)
  )

  const router = useRouter()
  const productQueries = router?.query?.queryID

  function getQueryObj(queries: any) {
    const splittedQueryArray = queries.split('?position=')
    const queryID = splittedQueryArray[0]
    const position = splittedQueryArray[1]
    const productQueryObj = {
      queryID,
      position,
    }
    return productQueryObj
  }

  const queryObject = productQueries ? getQueryObj(productQueries) : null
  const productData = data?.data?.results

  const breadcrumbItems: breadcrumbType = breadcrumb.product
  breadcrumbItems[2] = {
    name: hit?.name,
    link: null,
    active: true,
  }

  let relatedProducts = []
  let alsoBoughtProducts = []

  if (status === 'success') {
    relatedProducts = productData.slice(0, 15)
    alsoBoughtProducts = productData.slice(15, 30)
  }

  return (
    <div className="flex container mx-auto flex-col items-start">
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <div className="flex flex-col px-4 md:px-0 lg:flex-row md:justify-start">
        <ProductMagnifier product={hit} />
        <ProductDetail product={hit}>
          <h3 className="lg:text-2xl text-lg font-bold">{hit?.name}</h3>
          <p>
            By <span className="text-green-500 ml-1">{hit?.vendor}</span>
          </p>
          {hit?.review_rating ? (
            <CustomerReview
              reviews={hit?.review_rating}
              ratings={hit?.rating}
            />
          ) : null}
          <ProductPriceView product={hit} queryObject={queryObject} />
        </ProductDetail>
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
          {productData.length > 15 && (
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
