import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { toAddressValueArray } from '@/components/Checkout/CheckoutAddressForm'
import { useAccount, useCart, useToast } from '@/hooks'
import {
  checkoutAddressAtom,
  checkoutFormAtom,
  watchCheckoutFormAtom,
} from '@/lib/atomConfig'

export default function useBillingAddress() {
  const [billingAddress, setBillingAddress] = useState('')
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const { updateCheckoutAddress, getUserAccount } = useAccount()
  const { data: userDetails } = useQuery('userDetails', getUserAccount)
  const [checkoutAddress, setCheckoutAddress] = useAtom(checkoutAddressAtom)
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )
  const { useCartData } = useCart()
  const { loadingToast, updateToast } = useToast()
  const { data: cart, status } = useCartData()
  const toastID = useRef(null)

  const updateBillingAddressHandler = (address: string) =>
    setBillingAddress(address)

  function useUpdateBillingAddress() {
    const queryClient = useQueryClient()

    return useMutation(() => updateCheckoutAddress('billing', cart.shipping), {
      mutationKey: 'updateCheckoutAddress',
      onMutate: () => {
        loadingToast(toastID)
      },
      onSettled: () => {
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        updateToast(toastID, 'success', 'billing address updated')
        setCheckoutForm({
          ...checkoutForm,
          billing: {
            form: null,
          },
        })
        setCheckoutAddress({
          ...checkoutAddress,
          billing: cart.shipping,
        })
        if (!watchCheckoutForm.includes('billing')) {
          setWatchCheckoutForm([...watchCheckoutForm, 'billing'])
        }
      },
      onError: () => {
        updateToast(toastID, 'error', 'unable to update billing address')
      },
    })
  }

  const updateBillingAddress = useUpdateBillingAddress()

  function billingTagAddressHandler(tagValue: string) {
    if (tagValue === 'use-a-different-billing-address') {
      setCheckoutForm({ ...checkoutForm, billing: { form: 'billing' } })
    } else if (
      toAddressValueArray(cart.shipping).length > 5 &&
      status === 'success'
    ) {
      updateBillingAddress.mutate()
    }
  }

  return {
    billingTagAddressHandler,
    updateBillingAddressHandler,
    billingAddress,
    cart,
    userDetails,
    status,
    checkoutForm,
    setCheckoutForm,
  }
}
