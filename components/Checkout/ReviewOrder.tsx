import ReviewOrderlist from '@/components/Checkout/ReviewOrderlist'
import FormattedPrice from '@/components/Price/FormattedPrice'
import ShippingMethod from '@/components/Shipping/ShippingMethod'
import { useCart } from '@/hooks'

export default function ReviewOrder() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  return (
    <div className="bg-white height-fit-content rounded-md w-full my-2 md:my-0  p-4">
      <h6 className="mb-2">
        <span className="font-semibold text-xl mb-2 mr-2">
          1. Review Your Order
        </span>
      </h6>
      <div className="cart-group">
        {cart?.items.map((item: any) => (
          <ReviewOrderlist key={item.productId} content={item} />
        ))}
      </div>
      <div className="subtotal flex items-center justify-between border-b pb-5">
        <h4 className="font-bold">SUBTOTAL</h4>
        <FormattedPrice className="font-bold" price={cart?.subTotal} />
      </div>
      <ShippingMethod shippingMethod={cart?.shipping?.service} />
      <style jsx>
        {`
          .cart-group {
            max-height: 600px;
            overflow-y: scroll;
          }
        `}
      </style>
    </div>
  )
}
