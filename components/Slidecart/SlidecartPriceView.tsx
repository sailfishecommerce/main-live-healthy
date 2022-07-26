import { AiOutlineMinus } from 'react-icons/ai'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'
import type { cartType } from '@/typings'

interface Props {
  category: string
  price: number
  withMinus?: boolean
}

function SlideCartPriceListing({ category, price, withMinus }: Props) {
  const priceClassname = withMinus
    ? 'text-green-500'
    : 'font-bold text-black text-md'

  const listClassname = category === 'Total' ? 'font-bold' : 'font-medium'
  return (
    <>
      {price > 0 && (
        <h3
          className={`md:text-xl text-md ${listClassname} justify-between flex my-1`}
        >
          {category}
          <span className="flex items-center ml-1 font-semibold text-green-500 text-md">
            {withMinus && <AiOutlineMinus />}
            <FormattedPrice className={priceClassname} price={price} />
          </span>
        </h3>
      )}
    </>
  )
}

export default function SlidecartPriceView() {
  const { useCartData } = useCart()
  const { data: cart }: cartType | any = useCartData()
  return (
    <>
      {cart !== null && cart?.discountTotal > 0 ? (
        <div className="total-view border my-2 border-2 p-2  bg-gray-100">
          <SlideCartPriceListing category="Subtotal" price={cart?.subTotal} />
          <SlideCartPriceListing
            category="Shipping"
            price={cart?.shipmentTotal}
          />
          <SlideCartPriceListing
            withMinus
            category="Discount"
            price={cart?.discountTotal}
          />
          <hr className="mb-2 mt-1 text-red-500 border-2" />
          <SlideCartPriceListing category="Total" price={cart?.grandTotal} />
        </div>
      ) : (
        <SlideCartPriceListing category="Total" price={cart?.grandTotal} />
      )}
    </>
  )
}
