import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GrLogin, GrLogout } from 'react-icons/gr'
import { IoPersonOutline } from 'react-icons/io5'

import CartIcon from '@/components/Icons/CartIcon'
import Whatsapp from '@/components/Icons/Whatsapp'
import PageLink from '@/components/Menu/PageLink'
import { useAccount } from '@/hooks'
import useSlidingTab from '@/hooks/useSlidingTab'
import useUI from '@/hooks/useUI'
import menuLinks from '@/json/menu.json'

export default function MenuLinks({ cart }: any) {
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
    <>
      <div className="md:flex items-center">
        <Whatsapp />
        <span className="font-bold text-green-500 mx-1">Whatsapp:</span>
        9449 2060
      </div>
      <ul className="lg:flex items-center justify-between w-1/3">
        {menuLinks.primaryMenu.map((menuItem) => (
          <PageLink
            className="lg:text-lg font-normal"
            key={menuItem.name}
            menuItem={menuItem}
          />
        ))}
      </ul>
      <div className="icons flex items-center justify-between w-16">
        <div className="flex items-center">
          {userDetails === null ? (
            <button
              type="button"
              title="Login"
              onClick={toggleAuthModalHandler}
            >
              <GrLogin className="mr-4" />
            </button>
          ) : (
            <button type="button" title="Logout">
              <GrLogout className="mr-2" />
            </button>
          )}
        </div>
        <button
          type="button"
          className="cart-icon relative"
          title="cart"
          onClick={() => updateSlideTab('SLIDING-CART')}
        >
          <CartIcon color="black" />
          {cart?.items?.length && (
            <div className="bg-yellow-500 rounded-full flex items-center text-white justify-center -mt-8 text-xs ml-2 z-5 absolute h-4 w-4">
              {cart?.items?.length}
            </div>
          )}
        </button>
        <Link passHref href="/account">
          <button type="button" title="account" className="account">
            <IoPersonOutline className="hover:text-green-500 ml-2" size={20} />
          </button>
        </Link>
      </div>
    </>
  )
}
