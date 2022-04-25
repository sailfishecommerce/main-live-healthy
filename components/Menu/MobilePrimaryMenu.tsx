import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { HiMenuAlt4 } from 'react-icons/hi'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import { useCart } from '@/hooks'
import useNav from '@/hooks/useNav'
import useSlidingTab from '@/hooks/useSlidingTab'

export default function MobilePrimaryMenu() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  const { showMobileSearch, toggleSearch, mobileMenu, toggleMobileMenu } =
    useNav()
  const { updateSlideTab } = useSlidingTab()
  return (
    <div className="flex items-center w-2/5 justify-between">
      <span className="mr-4 flex items-center">
        <button
          type="button"
          className="cart-icon relative mx-2"
          onClick={() => updateSlideTab('SLIDING-CART')}
        >
          <CartIcon color="black" />
          <div className="bg-yellow-500 rounded-full flex items-center text-white justify-center -mt-8 text-xs ml-2 z-5 absolute h-4 w-4">
            {cart?.items?.length}
          </div>
        </button>
        <Link passHref href="/account">
          <button type="button" title="account" className="account">
            <IoPersonOutline className="hover:text-green-500" size={20} />
          </button>
        </Link>
        {!showMobileSearch && (
          <button type="button" className="mx-2" onClick={toggleSearch}>
            <BsSearch />
          </button>
        )}
      </span>
      <button type="button" onClick={toggleMobileMenu}>
        {!mobileMenu ? <HiMenuAlt4 /> : <FaTimes />}
      </button>
    </div>
  )
}
