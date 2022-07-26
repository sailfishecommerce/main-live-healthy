import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

import CartCoupon from '@/components/Slidecart/CartCoupon'
import SlidecartPriceView from '@/components/Slidecart/SlidecartPriceView'
import ViewDiscount from '@/components/Slidecart/ViewDiscount'
import { useCart } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'
import type { cartType } from '@/typings'

export default function CartTotal() {
  const { useCartData } = useCart()
  const { data: cart }: cartType | any = useCartData()
  const { updateSlideTab } = useSlidingTab()

  return (
    <>
      <div className="cart-total-view absolute bottom-0 bg-white lg:p-6 p-3 w-full right-0">
        <ViewDiscount cart={cart} />
        <SlidecartPriceView />
        <CartCoupon coupon={cart?.coupon} discounts={cart?.discounts} />
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
        `}
      </style>
    </>
  )
}
