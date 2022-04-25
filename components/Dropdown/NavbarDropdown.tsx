import dynamic from 'next/dynamic'
import { useState, useCallback, memo } from 'react'
import { useQuery } from 'react-query'

import useMediaQuery from '@/hooks/useMediaQuery'
import useSwellCart from '@/hooks/useSwellCart'

const HeaderCartDropdown = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Dropdown/CartDropdown'
    )
)

const NavCartView = dynamic(
  () => import(/* webpackChunkName: 'common' */ '@/components/Cart/NavCartView')
)
const NavCartViewMobile = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Cart/NavCartViewMobile'
    )
)

function NavbarDropdownComponent() {
  const [dropdownStatus, setDropdownStatus] = useState(false)
  const tabWidth = useMediaQuery('(max-width:768px)')

  // const { toggleCart } = useCart()

  const { getACart } = useSwellCart()

  const { data: cart } = useQuery('cart', getACart)

  const onClickHandler = useCallback(() => {
    setDropdownStatus(!dropdownStatus)
  }, [])

  return (
    <>
      {tabWidth ? (
        <NavCartViewMobile cart={cart} onClickHandler={onClickHandler} />
      ) : (
        <NavCartView cart={cart} onClickHandler={onClickHandler} />
      )}
      {!tabWidth && dropdownStatus && cart?.items.length > 0 && (
        <div className="absolute md:top-24 top-16 right-5 md:-right-10 flex items-center justify-center w-1/4 z-40">
          <HeaderCartDropdown
            cart={cart}
            className="bg-white shadow-lg px-2 md:px-4 rounded-md"
          />
        </div>
      )}
    </>
  )
}
const NavbarDropdown = memo(NavbarDropdownComponent)
export default NavbarDropdown
