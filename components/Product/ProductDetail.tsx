import Link from 'next/link'

import PaymentMethodView from '@/components/Payment/PaymentMethodView'
import ProductPriceView from '@/components/Product/ProductPriceView'
import SeeMoreProductInfo from '@/components/Product/SeeMoreProductInfo'
import CustomerReview from '@/components/Reviews/CustomerReview'
import { useAppDispatch } from '@/hooks/useRedux'
import useSlidingTab from '@/hooks/useSlidingTab'
import { updateActiveProduct } from '@/redux/product-slice'

export default function ProductDetail({ product }: any) {
  const dispatch = useAppDispatch()
  const { updateSlideTab } = useSlidingTab()

  function seeMoreProductsHandler() {
    updateSlideTab('SLIDING-INFO')
    dispatch(updateActiveProduct(product))
  }
  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-start">
      <h3 className="text-2xl font-bold">{product.name}</h3>
      <p>
        By{' '}
        <Link passHref href={`/collection/${product.name}`}>
          <a className="text-green-500">{product.vendor}</a>
        </Link>
      </p>
      <CustomerReview
        reviews={product?.review_rating}
        ratings={product?.rating}
      />
      <ProductPriceView product={product} />
      <SeeMoreProductInfo
        title="Product Information"
        onClick={seeMoreProductsHandler}
      />
      <SeeMoreProductInfo
        title="Ingredients"
        onClick={seeMoreProductsHandler}
      />
      <SeeMoreProductInfo title="Directions" onClick={seeMoreProductsHandler} />
      <hr className="my-4 border border-gray-100" />
      <PaymentMethodView />
    </div>
  )
}
