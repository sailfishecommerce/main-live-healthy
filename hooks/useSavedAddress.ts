import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAccount, useToast } from '@/hooks'
import {
  checkoutAddressAtom,
  checkoutFormAtom,
  watchCheckoutFormAtom,
} from '@/lib/atomConfig'

export default function useSavedAddress() {
  const { listUserAddress, deleteUserAddress, updateShippingAddressById } =
    useAccount()
  const { loadingToast, updateToast } = useToast()
  const [dropdown, setDropdown] = useState(false)
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const [checkoutAddress, setCheckoutAddress] = useAtom(checkoutAddressAtom)
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )
  const queryClient = useQueryClient()

  const {
    data: addresses,
    status,
    error,
  }: any = useQuery('listUserAddress', listUserAddress)

  function useDeleteAddressHandler() {
    const toastID = useRef(null)

    return useMutation((addressId: any): any => deleteUserAddress(addressId), {
      mutationKey: 'useDeleteAddressHandler',
      onMutate: () => loadingToast(toastID),
      onSettled: () => queryClient.invalidateQueries('listUserAddress'),
      onSuccess: (response) => {
        if (response) {
          updateToast(toastID, 'success', 'address deleted')
        }
      },
      onError: () => {
        updateToast(toastID, 'error', 'error deleting address')
      },
    })
  }

  function useSelectAddressHandler() {
    const toastID2 = useRef(null)

    return useMutation(
      (addressId: string) => updateShippingAddressById(addressId),
      {
        mutationKey: 'useSelectAddressHandler',
        onMutate: () => loadingToast(toastID2),
        onSettled: () => {
          queryClient.invalidateQueries('listUserAddress')
          queryClient.invalidateQueries('cart')
        },
        onSuccess: (data) => {
          updateToast(toastID2, 'success', 'address selected')
          setDropdown(false)
          setCheckoutAddress({
            ...checkoutAddress,
            shipping: data.shipping,
          })
          setCheckoutForm({
            ...checkoutForm,
            shipping: {
              form: null,
            },
          })
          if (!watchCheckoutForm.includes('shipping')) {
            setWatchCheckoutForm([...watchCheckoutForm, 'shipping'])
          }
        },
        onError: () => {
          updateToast(toastID2, 'error', 'error selecting address')
          setCheckoutForm({
            ...checkoutForm,
            shipping: {
              form: null,
            },
          })
        },
      }
    )
  }

  function dropdownHandler() {
    setDropdown(!dropdown)
  }

  return {
    dropdownHandler,
    addresses,
    useDeleteAddressHandler,
    status,
    useSelectAddressHandler,
    error,
    dropdown,
  }
}
