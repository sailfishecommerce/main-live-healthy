import Link from 'next/link'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import AuthIcons from '@/components/Menu/AuthIcon'
import GreetUser from '@/components/Menu/GreetUser'
import { useCart } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'
import type { slidingTabType } from '@/typings/atomtype'

export default function MenuIcons() {
  const { updateSlideTab } = useSlidingTab()
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  function updateSlidingTabHandler(slidingTabState: slidingTabType) {
    return updateSlideTab(slidingTabState)
  }

  return (
    <div className="icons flex flex-col w-1/4 items-end">
      <div className="row-1 flex items-center justify-between w-2/3">
        <AuthIcons />
        <button
          aria-label="cart"
          type="button"
          title="cart"
          className="cart-icon relative mx-4"
          onClick={() => updateSlidingTabHandler('SLIDING-CART')}
        >
          <CartIcon size={35} color="black" />
          {cart !== null && (
            <div className="bg-yellow-500 rounded-full flex items-center text-white justify-center -mt-8 text-xs ml-2 z-5 absolute h-4 w-4">
              {cart?.items?.length}
            </div>
          )}
        </button>
        <Link passHref href="/account">
          <button
            aria-label="account"
            type="button"
            title="account"
            className="account"
          >
            <IoPersonOutline className="hover:text-green-500" size={25} />
          </button>
        </Link>
      </div>
      <GreetUser />
    </div>
  )
}
