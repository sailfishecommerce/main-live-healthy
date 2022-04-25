import Image from 'next/image'
import { useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'

import ProductControls from '@/components/Product/ProductControls'
import useShoppingCart from '@/hooks/useShoppingCart'

export default function ProductRow({ cart }: any) {
  const { removeCartItem, updateCartItem, loadingState } = useShoppingCart()

  useEffect(() => {
    loadingState(removeCartItem, `${cart.product.name} removed`)
  }, [removeItemFromCart])

  loadingState(updateCartItem, `${cart.product.name} updated`)

  function removeItemFromCart() {
    removeCartItem.mutate(cart)
  }

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
        <h5 className="text-lg">{cart.product.name}</h5>
        <div className="row flex items-center justify-between mt-4">
          <ProductControls cart={cart} />
          <h4 className="text-xl">$ {cart.priceTotal}</h4>
          <button type="button" onClick={removeItemFromCart}>
            <RiDeleteBin5Line
              title="delete"
              size={30}
              className="deletebtn"
              fill="#9e9aa6"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
