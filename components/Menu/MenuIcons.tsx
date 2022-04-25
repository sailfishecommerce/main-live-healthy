import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GrLogin, GrLogout } from 'react-icons/gr'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import { useAccount, useCart } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'
import useUI from '@/hooks/useUI'

export default function MenuIcons() {
  const { useCartData } = useCart()
  const { data: cart }: any = useCartData()
  const { updateSlideTab } = useSlidingTab()
  const { toggleAuthModalHandler }: any = useUI()
  const { getUserAccount } = useAccount()
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    getUserAccount()
      .then((response) => setUserDetails(response))
      .catch((err) => setUserDetails(err))
  }, [])

  return (
    <div className="icons flex items-center justify-between w-1/6">
      <div className="flex items-center">
        {userDetails === null ? (
          <button type="button" title="Login" onClick={toggleAuthModalHandler}>
            <GrLogin className="mr-4 hover:text-green-500" size={25} />
          </button>
        ) : (
          <button type="button" title="Logout">
            <GrLogout className="mr-2 hover:text-green-500" size={25} />
          </button>
        )}
      </div>
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
