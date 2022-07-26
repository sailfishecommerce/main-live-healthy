import FormattedPrice from '@/components/Price/FormattedPrice'
import type { cartType } from '@/typings'

interface Props {
  cart: cartType
}

export default function OrderSummary({ cart }: Props) {
  return (
    <div className="rounded-md pt-4 bg-white rounded-md p-4 my-2 h-full">
      <h4 className="text-xl font-semibold mb-4">Order Total</h4>
      <div className="subtotal flex items-center justify-between">
        <h6 className="font-light text-base">Subtotal</h6>
        <FormattedPrice className="text-sm font-bold" price={cart?.subTotal} />
      </div>
      <div className="subtotal flex items-center justify-between my-1">
        <h6 className="font-light text-base">Discount</h6>
        <div>
          <span className="minus mr-1 text-xl text-green-500">-</span>
          <FormattedPrice
            className="text-sm font-bold text-green-500"
            price={cart?.discountTotal}
          />
        </div>
      </div>
      <div className="subtotal flex items-center justify-between">
        <h6 className="font-light text-base">Shipping Fee</h6>
        <FormattedPrice
          className="text-sm font-bold"
          price={cart?.shipmentTotal}
        />
      </div>
      <div className="my-4 justify-between items-center flex border-t pt-2">
        <h4 className="text-xl font-bold">Total</h4>
        <FormattedPrice
          className="font-bold text-black text-base"
          price={cart?.grandTotal}
        />
      </div>
    </div>
  )
}
