import Link from 'next/link'
import { AiOutlineMinus } from 'react-icons/ai'
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
  const { couponInputHandler, useAddCoupon } = useCoupon()
  const addCoupon = useAddCoupon()

  return (
    <>
      <div className="cart-total-view absolute bottom-0 bg-white p-6 py-4 w-full right-0">
        <div className="note-view p-2 bg-blue-100 mb-4">
          <h2 className="note text-red-500 text-sm text-center">
            You can only apply{' '}
            <span className="text-red-800 font-bold">ONE (1)</span> coupon code
          </h2>
        </div>
        <div className="total flex items-center justify-between">
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
          <div className="discount discount-view rounded-md border text-sm text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 border-red-500">
            Discount:{' '}
            <FormattedPrice
              className="font-semibold text-md"
              price={cart?.discountTotal}
            />
          </div>
        </div>
        {cart !== null && cart.discountTotal > 0 ? (
          <div className="total-view border my-2 border-2 p-2  bg-gray-100">
            <h3 className="md:text-xl text-md font-medium ">
              Subtotal:{' '}
              <FormattedPrice
                className="font-bold text-black text-md"
                price={cart?.subTotal}
              />
            </h3>
            {cart?.discountTotal > 0 && (
              <h3 className="md:text-xl text-md font-medium my-1 lg:my-2 flex">
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
            {cart?.grandTotal > 0 && (
              <h3 className="md:text-xl text-md font-medium  lg:mt-2 flex">
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
            Subtotal:{' '}
            <FormattedPrice
              className="font-bold text-black text-md"
              price={0}
            />
          </h1>
        )}
        {!(cart.discountTotal > 0) && (
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
              className="rounded-xl flex items-center discountCode lg:w-2/5 bg-mountain-green text-white md:px-4 py-3 p-2 text-xs lg:text-sm font-medium"
              onClick={() => addCoupon.mutate()}
            >
              Add discount code
            </button>
          </div>
        )}

        {cart?.coupon && (
          <div className="applied-discounts">
            <h3 className="font-bold text-sm">Applied Discounts</h3>
            <div className="applied-discounts-tags flex flex-wrap">
              {cart?.discounts.map((discount: any) => (
                <AppliedDiscountTag key={discount.id} coupon={cart?.coupon} />
              ))}
            </div>
          </div>
        )}
        <Link passHref href={`/checkout/${cart?.checkoutId}`}>
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
          .cart-total-view {
            box-shadow: 0px -4px 32px 0px #0000001a;
          }
          button.bg-tan-hide:hover {
            background-color: var(--color-5);
          }
          button.bg-mountain-green:hover {
            background-color: var(--color-2);
          }
          @media (max-width: 768px) {
            .text-gray-500 {
              font-size: 12px;
            }
            .input-wrapper input {
              height: 25px;
            }
            .discountCode {
              height: 25px;
              display: flex;
              align-items: center;
            }
            .discount-view {
              font-size: 12px;
              padding: 2px 5px;
            }
          }
        `}
      </style>
    </>
  )
}
