import { memo } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import useShoppingCart from '@/hooks/useShoppingCart'
import type { cartType } from '@/typings'

interface Props {
  cart: cartType
}

function ProductControlsComponent({ cart }: Props) {
  const { updateCartItem } = useShoppingCart()

  function updateQuantity(type: 'DEC' | 'INC'): void {
    const operationType = type === 'INC' ? cart.quantity + 1 : cart.quantity - 1
    updateCartItem.mutate({ product: cart, quantity: operationType })
  }

  return (
    <div className="flex items-center border rounded-md">
      <button
        type="button"
        title="decrease quantity"
        aria-label="decrease quantity"
        className="lg:w-8 w-4 h-4 lg:h-8 flex justify-center items-center rounded-lg hover:bg-red-500 hover:text-white"
        onClick={() => updateQuantity('DEC')}
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
        aria-label="increase"
        title="increase quantity"
        className="w-8 h-8 flex justify-center items-center rounded-lg hover:bg-green-500 hover:text-white"
        onClick={() => updateQuantity('INC')}
      >
        <AiOutlinePlus />
      </button>
    </div>
  )
}
const ProductControls = memo(ProductControlsComponent)
export default ProductControls
