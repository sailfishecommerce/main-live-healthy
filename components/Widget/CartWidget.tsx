import Link from 'next/link'

import Image from '@/components/Image'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { cartType } from '@/typings/types'

interface CartWidgetProps {
  cart: cartType
  className: string
}

export default function CartWidget({ cart, className }: CartWidgetProps) {
  const { removeCartItem } = useShoppingCart()

  // loadingState(removeCartItem, `${cart.product.name} removed`)

  const removeItemFromCart = () => removeCartItem.mutate(cart)

  return (
    <div className="widget-cart-item py-2 border-b-2 relative">
      <button
        className="hover:bg-red-500 flex  justify-center items-center hover:text-white p-1 w-6 h-6 m-auto rounded-full border-2 border-red-500 absolute z-40 right-0 top-10"
        type="button"
        aria-label="remove"
        onClick={removeItemFromCart}
      >
        <span className="text-3xl -mt-1 leading-none">&times;</span>
      </button>
      <div className="flex items-center">
        <Link passHref href={`/products/${cart.product.slug}`}>
          <a aria-label={cart.product.name} className="flex-shrink-0">
            <Image
              src={cart.product.images[0]}
              alt={cart.product.name}
              width={64}
              height={64}
            />
          </a>
        </Link>
        <div className="px-2 hover:text-red-500">
          <h6 className={`widget-product-title ${className} text-sm`}>
            <Link passHref href={`/products/${cart.product.slug}`}>
              <a aria-label={cart.product.name} className="w-full">
                {cart.product.name}
              </a>
            </Link>
          </h6>
          <div className="flex items-center">
            <span className="text-red-500 font-bold text-sm">
              <FormattedPrice price={cart?.price} className="lg:text-sm" />
            </span>
            <div className="items-center flex mx-1">
              <span className="items-center flex mx-1 text-2xl my-0">
                &times;
              </span>
              <span className="text-md">{cart.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h6.widget-product-title {
            overflow: hidden;
            text-overflow: ellipsis;
          }
          h6.widget-product-title a {
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  )
}
