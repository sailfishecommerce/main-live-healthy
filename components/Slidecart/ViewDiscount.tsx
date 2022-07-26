import FormattedPrice from '@/components/Price/FormattedPrice'
import type { cartType } from '@/typings'

interface Props {
  cart: cartType
}

export default function ViewDiscount({ cart }: Props) {
  return (
    <>
      <div className="note-view p-2 bg-blue-100 mb-2">
        <h2 className="note text-red-500 text-sm text-center">
          You can only apply{' '}
          <span className="text-red-800 font-bold">ONE (1)</span> coupon code
        </h2>
      </div>
      <div className="total flex items-center justify-between">
        {cart?.discounts !== null && cart?.discounts.length === 0 && (
          <h4 className="text-gray-500 mr-8">
            Subtotal:{' '}
            {cart !== null && (
              <FormattedPrice
                className="font-bold text-black text-md"
                price={cart?.subTotal}
              />
            )}
          </h4>
        )}
        <div className="discount discount-view rounded-md border text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 border-red-500">
          Discount:{' '}
          <FormattedPrice
            className="font-semibold text-md"
            price={cart?.discountTotal}
          />
        </div>
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .discount-view {
              font-size: 12px;
              padding: 2px 5px;
            }
            .text-gray-500 {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  )
}
