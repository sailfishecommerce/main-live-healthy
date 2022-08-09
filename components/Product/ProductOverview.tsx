import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Breadcrumb from '@/components/Breadcrumb'
import ProductMetatag from '@/components/Metatag/ProductMetatag'
import ProductDetail from '@/components/Product/ProductDetail'
import ProductMagnifier from '@/components/Product/ProductMagnifier'
import ProductPriceView from '@/components/Product/ProductPriceView'
import RelatedProducts from '@/components/Product/RelatedProducts'
import CustomerReview from '@/components/Reviews/CustomerReview'
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

const ProductReview = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductReview' */ '@/components/Product/ProductReview'
    )
)
export default function ProductOverview({ hit }: any) {
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

  const breadcrumbItems: breadcrumbType = breadcrumb.product
  breadcrumbItems[2] = {
    name: hit?.name,
    link: null,
    active: true,
  }

  return (
    <>
      <ProductMetatag product={hit} />
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
        <RelatedProducts hit={hit} />
      </div>
    </>
  )
}
