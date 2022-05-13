import { BsCart4 } from 'react-icons/bs'

export default function NavCartViewMobile({ cart, onClickHandler }: any) {
  return (
    <button
      type="button"
      aria-label="cart"
      className="cart-icon relative flex flex-col border bg-gray-300 rounded-full h-10 items-center justify-center w-10 mr-2"
      onClick={onClickHandler}
    >
      <span className="absolute text-xs md:text-sm top-0 right-0 -mt-2 text-white justify-center bg-red-500 rounded-full h-4 w-4 flex items-center">
        {cart?.items?.length}
      </span>
      <BsCart4 className="mx-2 my-0" size={26} />
    </button>
  )
}
