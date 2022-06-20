import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

import FormattedPrice from '@/components/Price/FormattedPrice'
import AppliedDiscountTag from '@/components/Tag/AppliedDiscountTag'
import { useCart } from '@/hooks'
import useCoupon from '@/hooks/useCoupon'
import useSlidingTab from '@/hooks/useSlidingTab'
import type { cartType } from '@/typings'

export default function SlideCardTotal() {
  const { useCartData } = useCart()
  const { data: cart }: cartType | any = useCartData()
  const { updateSlideTab } = useSlidingTab()
  const { allDiscount, onSubmitCoupon, couponInputHandler } = useCoupon()

  return (
    <>
      <div className="cart-total absolute bottom-0 bg-white p-6 py-4 w-full right-0">
        <div className="total flex items-center">
          <h4 className="text-gray-500 mr-8">
            Total:{' '}
            {cart !== null ? (
              <FormattedPrice
                className="font-bold text-black text-md"
                price={cart?.grandTotal}
              />
            ) : (
              <FormattedPrice
                className="font-bold text-black text-md"
                price={0}
              />
            )}
          </h4>{' '}
          <div className="discount rounded-md border text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 border-red-500">
            Discount: HK$ 0
          </div>
        </div>
        {cart !== null ? (
          <h1 className="md:text-xl text-lg font-medium mt-2">
            Subtotal:{' '}
            <FormattedPrice
              className="font-bold text-black text-md"
              price={cart?.subTotal}
            />
          </h1>
        ) : (
          <h1 className="md:text-xl text-lg font-medium mt-2">
            Subtotal:{' '}
            <FormattedPrice
              className="font-bold text-black text-md"
              price={0}
            />
          </h1>
        )}
        <div className="discount flex  md:flex-row  items-center justify-between my-2">
          <div className="input-wrapper md:w-1/2 w-1/2 my-2 md:my-0 relative">
            <input
              placeholder="Enter promocode"
              type="text"
              className="border rounded-lg px-2 py-2 w-full"
              onChange={couponInputHandler}
            />
          </div>
          <button
            aria-label="add discount code"
            type="button"
            className="rounded-xl  lg:w-2/5 bg-mountain-green text-white md:px-4 py-3 p-2 text-xs  lg:text-sm font-medium"
            onClick={onSubmitCoupon}
          >
            Add discount code
          </button>
        </div>
        {allDiscount.length > 0 && (
          <div className="applied-discounts">
            <h3 className="font-bold text-sm">Applied Discounts</h3>
            <div className="applied-discounts-tags flex flex-wrap">
              {allDiscount.map((discount: any, index: number) => (
                <AppliedDiscountTag
                  key={discount?.id}
                  discountTitle={discount.description}
                  count={index}
                />
              ))}
            </div>
          </div>
        )}
        <Link passHref href="/checkout">
          <button
            type="button"
            className="bg-tan-hide w-full flex items-center p-2 mt-2 font-bold text-white rounded-md justify-center"
            onClick={() => updateSlideTab(null)}
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
            background-color: var(--color-2);
          }
        `}
      </style>
    </>
  )
}
