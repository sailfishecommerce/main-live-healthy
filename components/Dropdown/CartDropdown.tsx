import Link from 'next/link'

import useCart from '@/hooks/useCart'
import FormattedPrice from '@/components/Price/FormattedPrice'

import { cartType } from '@/types'
import CartWidget from '@/components/Widget/CartWidget'
import useAirwallexPayment from '@/hooks/useAirwallexPayment'
import Icons from '@/components/Icons'

interface Props {
  cart: cartType
  className?: string
}

export default function CartDropdown({ cart, className }: Props) {
  const { toggleCart } = useCart()
  const { disableBtn } = useAirwallexPayment()

  return (
    <div className={className}>
      <div className="w-40 md:w-80 px-3 pt-2 pb-3">
        <div className="product-group flex flex-col">
          {cart?.items.map((item: cartType, index: number) => (
            <CartWidget
              className="w-44"
              key={`${item.productId}-${index}`}
              cart={item}
            />
          ))}
        </div>
        <div className="flex flex-col flex-row justify-between items-center px-0 py-3">
          <div className="flex flex-col md:flex-row items-center">
            <span className="mr-1 font-bold">Subtotal:</span>
            <span className="font-bold text-red-500 text-md ms-1">
              <FormattedPrice className="lg:text-sm" price={cart?.subTotal} />
            </span>
          </div>
          <button
            onClick={toggleCart}
            aria-label="expand cart"
            className="text-sm hover:bg-red-500 flex items-center cursor-pointer hover:text-white rounded-md px-1 py-1 border-red-500 border-2 text-red-500 font-bold"
          >
            Expand cart
            <Icons icon="arrow-next" className="ml-1" />
          </button>
        </div>
        <Link passHref href="/checkout">
          <button
            aria-label="checkout"
            disabled={disableBtn}
            className="bg-red-500 items-center w-4/5 cursor-pointer justify-center mx-auto flex rounded-md text-white px-2 py-1 text-sm hover:bg-transparent border-red-500 border-2 hover:text-red-400 font-bold"
          >
            Checkout
            <Icons icon="cart" className="ml-1" />
          </button>
        </Link>
      </div>
      <style jsx>
        {`
          .product-group {
            max-height: 300px;
            overflow-y: auto;
            overflow-x: unset;
          }
        `}
      </style>
    </div>
  )
}
