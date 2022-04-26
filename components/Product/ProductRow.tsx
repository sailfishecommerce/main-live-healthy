/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import { useEffect } from 'react'

import TrashIcon from '@/components/Icons/TrashIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import ProductControls from '@/components/Product/ProductControls'
import useShoppingCart from '@/hooks/useShoppingCart'

export default function ProductRow({ cart }: any) {
  const { removeCartItem, updateCartItem, loadingState } = useShoppingCart()
  const removeItemFromCart = () => removeCartItem.mutate(cart)

  useEffect(() => {
    loadingState(removeCartItem, `${cart.product.name} removed`)
  }, [removeItemFromCart])

  loadingState(updateCartItem, `${cart.product.name} updated`)

  return (
    <div className="flex items-center  border-b p-4 hover:bg-gray-100">
      <div className="w-1/4 mr-4">
        <Image
          src={cart.product.images[0].file.url}
          alt={cart.product.name}
          height={90}
          width={120}
          blurDataURL={cart.product.images[0].file.url}
          className="bg-gray-200 rounded-md"
          layout="responsive"
        />
      </div>
      <div className="text-content flex flex-col w-3/4">
        <h5 className="2xl:text-lg text-md">{cart.product.name}</h5>
        <div className="row flex items-center justify-between mt-4">
          <ProductControls cart={cart} />
          <FormattedPrice
            price={cart.priceTotal}
            className="font-bold text-black text-md"
          />
          <button type="button" onClick={removeItemFromCart}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
