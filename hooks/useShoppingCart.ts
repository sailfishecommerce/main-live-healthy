import useMutationAction from '@/hooks/useMutationAction'
// import useToast from '@/hooks/useToast'

export default function useShoppingCart() {
  const { useRemoveFromCart, useAddItemToCartModal, useUpdateCartItem } =
    useMutationAction()
  const { useAddItemToCart } = useMutationAction()
  const removeCartItem = useRemoveFromCart()
  const addItemToCart = useAddItemToCart()
  // const { isLoading, isSuccessful, hasError } = useToast()
  const addItemToCartModal = useAddItemToCartModal()
  const updateCartItem = useUpdateCartItem()

  // function loadingState(mutator: any, data: string) {
  //   const loadingId = isLoading()
  //   mutator.isError
  //     ? hasError(loadingId, 'an error occured, please try again')
  //     : mutator.isSuccess
  //     ? isSuccessful(loadingId, data)
  //     : null
  // }

  return {
    addItemToCart,
    removeCartItem,
    addItemToCartModal,
    updateCartItem,
  }
}
