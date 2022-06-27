import Image from 'next/image'

import TrashIcon from '@/components/Icons/TrashIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import ProductControls from '@/components/Product/ProductControls'
import useShoppingCart from '@/hooks/useShoppingCart'

export default function ProductRow({ cart }: any) {
  const { removeCartItem } = useShoppingCart()
  const removeItemFromCart = () => removeCartItem.mutate(cart)

  const productImage =
    typeof cart.product.images[0] === 'string'
      ? cart.product.images[0]
      : cart.product.images[0].file.url

  return (
    <div className="flex items-center product-row  border-b p-4 hover:bg-gray-100">
      <div className="w-1/4 mr-4 rounded-lg bg-gray-200">
        <Image
          src={productImage}
          alt={cart.product.name}
          height={90}
          width={120}
          blurDataURL={cart.product.images[0]}
          className="bg-gray-200 rounded-lg"
          layout="responsive"
        />
      </div>
      <div className="text-content flex flex-col w-3/4">
        <h5 className="2xl:text-lg md:text-md text-xs">{cart.product.name}</h5>
        <div className="row flex items-center justify-between mt-4">
          <ProductControls cart={cart} />
          <FormattedPrice
            price={cart.priceTotal}
            className="font-bold text-black lg:text-base text-xs"
          />
          <button
            aria-label="delete"
            type="button"
            onClick={removeItemFromCart}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
