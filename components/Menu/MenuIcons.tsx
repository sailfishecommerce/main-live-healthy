import Link from 'next/link'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import AuthIcons from '@/components/Menu/AuthIcon'
import { useCart } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'

export default function MenuIcons() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  const { updateSlideTab } = useSlidingTab()

  return (
    <div className="icons flex items-center justify-between w-1/6">
      <AuthIcons />
      <button
        type="button"
        className="cart-icon relative mx-4"
        title="cart"
        onClick={() => updateSlideTab('SLIDING-CART')}
      >
        <CartIcon size={35} color="black" />
        {cart?.items?.length && (
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
  )
}
