import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'

export default function OrderSummary() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()

  return (
    <div className="rounded-md pt-4 bg-white rounded-md p-4 my-2 h-full">
      <h4 className="text-xl font-semibold mb-4">Order Total</h4>

      <div className="subtotal flex items-center justify-between my-1">
        <h6 className="font-light text-base">Subtotal</h6>
        <FormattedPrice className="text-sm font-bold" price={cart?.subTotal} />
      </div>
      <div className="subtotal flex items-center justify-between my-1">
        <h6 className="font-light text-base">Discount</h6>
        <FormattedPrice
          className="text-sm font-bold text-red-500"
          price={cart?.discountTotal}
        />
      </div>
      <div className="subtotal flex items-center justify-between my-1">
        <h6 className="font-light text-base">Shipping Free</h6>
        <FormattedPrice
          className="text-sm font-bold text-green-500"
          price={cart?.shipmentTotal}
        />
      </div>
      <div className="my-4 justify-between items-center flex">
        <h4 className="text-xl font-bold">Total</h4>
        <FormattedPrice
          className="font-bold text-black text-base"
          price={cart?.grandTotal}
        />
      </div>
    </div>
  )
}
