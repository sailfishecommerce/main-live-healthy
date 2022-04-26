import { BsArrowRight } from 'react-icons/bs'

import ReviewOrderlist from '@/components/Checkout/ReviewOrderlist'
import FormattedPrice from '@/components/Price/FormattedPrice'
import ShippingMethod from '@/components/Shipping/ShippingMethod'
import { useCart } from '@/hooks'

export default function ReviewOrder() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  return (
    <div className="bg-white rounded-md w-full my-2 md:my-0 lg:h-full lg:w-1/4 md:w-1/2 p-4">
      <h6 className="mb-2">
        <span className="font-semibold text-xl mb-2 mr-2">
          1. Review Your Order
        </span>
      </h6>
      {cart?.items.map((item: any) => (
        <ReviewOrderlist key={item.productId} content={item} />
      ))}
      <div className="subtotal flex items-center justify-between border-b pb-5">
        <h4 className="font-bold">SUBTOTAL</h4>
        <FormattedPrice className="font-bold" price={cart?.subTotal} />
      </div>
      <ShippingMethod />
      <button
        type="button"
        className="bg-tan-hide flex items-center justify-center font-bold text-lg text-white w-full py-2 rounded-lg my-6"
      >
        Next step <BsArrowRight className="ml-3 font-bold mt-2" />
      </button>
    </div>
  )
}
