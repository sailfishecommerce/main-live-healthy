import Link from 'next/link'

import Image from '@/components/Image'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { cartType } from '@/typings/types'

interface CartWidgetProps {
  cart: cartType
}

export default function CartWidget({ cart }: CartWidgetProps) {
  const { removeCartItem } = useShoppingCart()

  // loadingState(removeCartItem, `${cart.product.name} removed`)

  function removeItemFromCart() {
    removeCartItem.mutate(cart)
    // removeVboutCartItem({
    //   cartId: cart.id,
    //   productId: cart.productId,
    // });
  }

  return (
    <div className="widget-cart-item py-2 border-bottom">
      <button
        className="btn-close text-danger"
        type="button"
        aria-label="remove"
        onClick={removeItemFromCart}
      >
        <span>&times;</span>
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
        <div className="ps-2">
          <h6 className="widget-product-title">
            <Link passHref href={`/products/${cart.product.slug}`}>
              <a aria-label={cart.product.name}>{cart.product.name}</a>
            </Link>
          </h6>
          <div className="widget-product-meta flex align-items-baseline">
            <span className="text-accent mx-2">
              <FormattedPrice price={cart?.price} />
            </span>
            <span className="text-gray-500">x {cart.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
