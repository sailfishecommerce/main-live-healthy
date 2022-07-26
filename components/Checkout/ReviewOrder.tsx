import OrderSummary from '@/components/Checkout/OrderSummary'
import ReviewOrderlist from '@/components/Checkout/ReviewOrderlist'
import { useCart, useMediaQuery } from '@/hooks'

export default function ReviewOrder() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const mobileDevice = useMediaQuery('(max-width:768px)')

  return (
    <div className="bg-white height-fit-content rounded-md w-full my-2 md:my-0  p-4">
      <h6 className="mb-2">
        <span className="font-semibold text-xl mb-2 mr-2">
          1. Review Your Order
        </span>
      </h6>
      <div className="cart-group">
        {cart?.items.map((item: any) => (
          <ReviewOrderlist key={item?.productId} content={item} />
        ))}
      </div>
      {(mobileDevice || (!mobileDevice && cart?.shipmentTotal > 0)) && (
        <OrderSummary cart={cart} />
      )}
      <style jsx>
        {`
          .cart-group {
            max-height: 700px;
            overflow-y: scroll;
          }
        `}
      </style>
    </div>
  )
}
