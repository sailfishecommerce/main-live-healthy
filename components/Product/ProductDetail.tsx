import Link from 'next/link'

import PaymentMethodView from '@/components/Payment/PaymentMethodView'
import ProductPriceView from '@/components/Product/ProductPriceView'
import SeeMoreProductInfo from '@/components/Product/SeeMoreProductInfo'
import CustomerReview from '@/components/Reviews/CustomerReview'
import { useAppDispatch } from '@/hooks/useRedux'
import useSlidingTab from '@/hooks/useSlidingTab'
import { updateActiveProduct } from '@/redux/product-slice'
import { updateSlidingTabInfo } from '@/redux/ui-slice'

export default function ProductDetail({ product }: any) {
  const dispatch = useAppDispatch()
  const { updateSlideTab } = useSlidingTab()

  function seeMoreProductsHandler(infoType: string) {
    updateSlideTab('SLIDING-INFO')
    dispatch(updateActiveProduct(product))
    dispatch(updateSlidingTabInfo(infoType))
  }
  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-start">
      <h3 className="lg:text-2xl text-lg font-bold">{product.name}</h3>
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
        onClick={() => seeMoreProductsHandler('Product Information')}
      />
      <SeeMoreProductInfo
        title="Storage Instructions"
        onClick={() => seeMoreProductsHandler('STORAGE INSTUCTIONS')}
      />
      <SeeMoreProductInfo
        title="Directions"
        onClick={() => seeMoreProductsHandler('Directions')}
      />
      <hr className="my-4 border border-gray-100" />
      <PaymentMethodView />
    </div>
  )
}
