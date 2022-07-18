import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { HiMenuAlt4 } from 'react-icons/hi'
import { IoPersonOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

import CartIcon from '@/components/Icons/CartIcon'
import AuthIcons from '@/components/Menu/AuthIcon'
import GreetUser from '@/components/Menu/GreetUser'
import { useCart } from '@/hooks'
import useNav from '@/hooks/useNav'
import useSlidingTab from '@/hooks/useSlidingTab'

export default function MobilePrimaryMenu() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  const { showMobileSearch, toggleSearch, mobileMenu, toggleMobileMenu } =
    useNav()
  const { updateSlideTab } = useSlidingTab()

  function showCartHandler() {
    if (cart?.items?.length > 0) {
      updateSlideTab('SLIDING-CART')
    } else {
      toast.error('cart is empty')
    }
  }

  return (
    <div className="mobile-menu flex flex-col w-1/2 pt-2">
      <div className="flex items-center justify-between">
        <span className="mr-1 md:w-4/5 w-full justify-between flex items-center">
          <AuthIcons />
          <button
            type="button"
            aria-label="cart"
            className="cart-icon relative mx-2"
            onClick={showCartHandler}
          >
            <CartIcon color="#080708" />
            {cart?.items?.length > 0 && (
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
              <IoPersonOutline className="hover:text-green-500" size={16} />
            </button>
          </Link>
          {!showMobileSearch && (
            <button
              type="button"
              aria-label="search"
              className="mx-2"
              onClick={toggleSearch}
            >
              <BsSearch size={16} />
            </button>
          )}
        </span>
        <button aria-label="button" type="button" onClick={toggleMobileMenu}>
          {!mobileMenu ? <HiMenuAlt4 size={22} /> : <FaTimes size={22} />}
        </button>
      </div>
      <GreetUser />
    </div>
  )
}
