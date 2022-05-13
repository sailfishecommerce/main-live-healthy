import { memo } from 'react'
import { BsCart4 } from 'react-icons/bs'

import FormattedPrice from '@/components/Price/FormattedPrice'

function NavCartViewComponent({ cart, onClickHandler }: any) {
  return (
    <button
      type="button"
      className="relative bg-gray-50 hover:bg-gray-100 shadow-lg cursor-pointer rounded-lg p-2 md:p-4 flex items-center w-3/8 lg:w-1/2 flex price-overview flex-col"
      onClick={onClickHandler}
    >
      <span className="text-xs md:text-md text-center font-bold">My Cart</span>
      {cart?.grandTotal ? (
        <button aria-label="cart" type="button" className="flex items-center">
          <div className="cart-icon relative flex flex-col mr-2">
            <span className="absolute top-0 right-0 -mt-2 text-white justify-center bg-red-500 rounded-full h-4 w-4 flex items-center">
              {cart?.items?.length}
            </span>
            <BsCart4 className="mx-2 my-0" size={26} />
          </div>
          <FormattedPrice
            className="font-bold w-full"
            price={cart?.grandTotal}
          />
        </button>
      ) : (
        <FormattedPrice price={0} />
      )}
    </button>
  )
}

const NavCartView = memo(NavCartViewComponent)

export default NavCartView
