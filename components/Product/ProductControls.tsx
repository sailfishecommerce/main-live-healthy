/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import useShoppingCart from '@/hooks/useShoppingCart'
import type { cartType } from '@/typings'

interface Props {
  cart: cartType
}

function ProductControlsComponent({ cart }: Props) {
  const { updateCartItem } = useShoppingCart()
  const [counter, setCounter] = useState(cart.quantity)

  const increaseQuantity = useCallback(() => {
    setCounter(counter + 1)
    updateCartItem.mutate({ product: cart, quantity: counter })
  }, [counter])

  const decreaseQuantity = useCallback(() => {
    if (counter > 1) {
      setCounter(counter - 1)
      updateCartItem.mutate({ product: cart, quantity: counter })
    }
  }, [counter])

  return (
    <div className="flex items-center border rounded-md">
      <button
        type="button"
        title="decrease quantity"
        className="lg:w-8 w-4 h-4 lg:h-8 flex justify-center items-center rounded-lg hover:bg-red-500 hover:text-white"
        onClick={decreaseQuantity}
      >
        <AiOutlineMinus />
      </button>
      <input
        readOnly
        className="lg:w-16 w-8 h-8 flex items-center text-center justify-between rounded-md"
        type="text"
        value={cart.quantity}
      />
      <button
        type="button"
        title="increase quantity"
        className="w-8 h-8 flex justify-center items-center rounded-lg hover:bg-green-500 hover:text-white"
        onClick={increaseQuantity}
      >
        <AiOutlinePlus />
      </button>
    </div>
  )
}
const ProductControls = memo(ProductControlsComponent)
export default ProductControls
