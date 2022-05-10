import useMutationAction from '@/hooks/useMutationAction'

export default function useShoppingCart() {
  const { useRemoveFromCart, useUpdateCartItem } = useMutationAction()
  const { useAddItemToCart } = useMutationAction()
  const removeCartItem = useRemoveFromCart()
  const addItemToCart = useAddItemToCart()
  const updateCartItem = useUpdateCartItem()

  return {
    addItemToCart,
    removeCartItem,
    updateCartItem,
  }
}
