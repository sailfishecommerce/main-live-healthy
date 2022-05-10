import useMutationAction from '@/hooks/useMutationAction'
// import useToast from '@/hooks/useToast'

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
