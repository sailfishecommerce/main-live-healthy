import { AiOutlineMinus } from 'react-icons/ai'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'
import type { cartType } from '@/typings'

export default function SlidecartPriceView() {
  const { useCartData } = useCart()
  const { data: cart }: cartType | any = useCartData()
  return (
    <>
      {cart !== null && cart.discountTotal > 0 ? (
        <div className="total-view border my-2 border-2 p-2  bg-gray-100">
          <h3 className="md:text-xl text-md font-medium justify-between flex">
            Subtotal:{' '}
            <FormattedPrice
              className="font-bold text-black text-md"
              price={cart?.subTotal}
            />
          </h3>
          {cart?.discountTotal > 0 && (
            <h3 className="md:text-xl text-md font-medium my-1 lg:my-2 flex justify-between ">
              Discount:{' '}
              <span className="flex items-center ml-1 font-semibold text-green-500 text-md">
                <AiOutlineMinus />
                <FormattedPrice
                  className="text-green-500"
                  price={cart?.discountTotal}
                />
              </span>
            </h3>
          )}
          <hr className="mb-2 mt-1 text-red-500 border-2" />
          {cart?.grandTotal > 0 && (
            <h3 className="md:text-xl text-md font-medium  lg:mt-2 flex justify-between">
              Total:{' '}
              {cart !== null && cart?.grandTotal > 0 && (
                <FormattedPrice
                  className="font-bold text-black text-md"
                  price={cart?.grandTotal}
                />
              )}
            </h3>
          )}
        </div>
      ) : (
        <h1 className="md:text-xl text-lg font-medium mt-2">
          Total:{' '}
          <FormattedPrice
            className="font-bold text-black text-md"
            price={cart?.grandTotal}
          />
        </h1>
      )}
    </>
  )
}
