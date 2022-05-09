import Link from 'next/link'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import AuthIcons from '@/components/Menu/AuthIcon'
import { useCart } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'
import type { slidingTabType } from '@/lib/atomConfigType'
import greetUser from '@/lib/greetUser'

export default function MenuIcons() {
  const { updateSlideTab } = useSlidingTab()
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()

  function updateSlidingTabHandler(slidingTabState: slidingTabType) {
    return updateSlideTab(slidingTabState)
  }

  return (
    <div className="icons flex flex-col w-1/5">
      <div className="row-1 flex items-center justify-between w-full">
        <AuthIcons />
        <button
          type="button"
          className="cart-icon relative mx-4"
          title="cart"
          onClick={() => updateSlidingTabHandler('SLIDING-CART')}
        >
          <CartIcon size={35} color="black" />
          {cart?.items?.length > 0 && (
            <div className="bg-yellow-500 rounded-full flex items-center text-white justify-center -mt-8 text-xs ml-2 z-5 absolute h-4 w-4">
              {cart?.items?.length}
            </div>
          )}
        </button>
        <Link passHref href="/account">
          <button type="button" title="account" className="account">
            <IoPersonOutline className="hover:text-green-500" size={25} />
          </button>
        </Link>
      </div>
      <h6 className="cart mountain-green font-bold text-xs">
        {cart?.accountLoggedIn !== null ? (
          <p>
            {greetUser()}, {cart?.account?.name}{' '}
          </p>
        ) : (
          <p>{`${greetUser()}, Guest`}</p>
        )}
      </h6>
    </div>
  )
}
