import { BsFillCheckCircleFill } from 'react-icons/bs'

import ReviewOrderlist from '@/components/Checkout/ReviewOrderlist'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'

export default function ReviewOrder() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const cartItem = cart?.items?.length > 1 ? 'ITEMS' : 'ITEM'
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
      <div className="subtotal flex items-center justify-between">
        <h4 className="font-bold">SUBTOTAL</h4>
        <FormattedPrice className="font-bold" price={cart?.subTotal} />
      </div>
      <div className="select-delivery">
        <h6 className="font-medium mb-2">Select delivery</h6>
        <div className="delivery-type flex items-center justify-between border border-gray-100 p-4 bg-gray-100">
          <h6 className="text-sm">FREE</h6>
          <div className="type flex flex-col">
            <h6 className="font-bold">Express</h6>
            <p className="font-medium text-gray-400 text-sm">
              (3 - 5 business days, tracking)
            </p>
          </div>
          <BsFillCheckCircleFill fill="orange" />
        </div>
      </div>
    </div>
  )
}
