import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

import AppliedDiscountTag from '@/components/Tag/AppliedDiscountTag'
import { useCart } from '@/hooks'
import type { cartType } from '@/typings'

export default function SlideCardTotal() {
  const { useCartData } = useCart()
  const { data: cart }: cartType | any = useCartData()

  const appliedDiscounts = [
    '10% Off On All Vitamins',
    'Buy 2 Get $30 Off!',
    'Free Shipping',
  ]

  return (
    <>
      <div className="cart-total absolute bottom-0 bg-white p-6 py-4 w-full right-0">
        <div className="total flex items-center">
          <h4 className="text-gray-500 mr-8">Total: HK$ 180</h4>{' '}
          <div className="discount rounded-md border text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 border-red-500">
            Discount: HK$ 136
          </div>
        </div>
        <h1 className="md:text-xl text-lg font-medium mt-2">
          Subtotal: HK$ {cart?.subTotal}
        </h1>
        <div className="discount flex flex-col md:flex-row items-start md:items-center justify-between my-2">
          <div className="input-wrapper md:w-1/2 w-full my-2 md:my-0 relative">
            <div className="text absolute left-1 top-1 w-3/4 bg-white">
              <p className="text-xs mb-0">Promocode</p>
              <h4 className="text-sm">BONUS-CODE</h4>
            </div>
            <input
              placeholder="Enter promocode"
              type="text"
              className="border rounded-lg px-2 py-2 w-full"
            />
          </div>
          <button
            type="button"
            className="rounded-xl w-full bg-mountain-green text-white px-4 py-2  text-sm font-medium"
          >
            Add discount code
          </button>
        </div>
        <div className="applied-discounts">
          <h3 className="font-bold text-sm">Applied Discounts</h3>
          <div className="applied-discounts-tags flex flex-wrap">
            {appliedDiscounts.map((discount, index) => (
              <AppliedDiscountTag
                key={index}
                discountTitle={discount}
                count={index}
              />
            ))}
          </div>
        </div>
        <Link passHref href="/checkout">
          <button
            type="button"
            className="bg-tan-hide w-full flex items-center p-2 mt-2 font-bold text-white rounded-md justify-center"
          >
            Secure checkout <HiOutlineArrowNarrowRight className="ml-2" />
          </button>
        </Link>
      </div>
      <style jsx>
        {`
          .cart-total {
            box-shadow: 0px -4px 32px 0px #0000001a;
          }
          button.bg-tan-hide:hover {
            background-color: var(--tan-deep-hide);
          }
          button.bg-mountain-green:hover {
            background-color: var(--mountain-mist);
          }
        `}
      </style>
    </>
  )
}
