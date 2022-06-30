import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAccount, useToast } from '@/hooks'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function useSavedAddress() {
  const { listUserAddress, deleteUserAddress, updateShippingAddressById } =
    useAccount()
  const { loadingToast, updateToast } = useToast()
  const [dropdown, setDropdown] = useState(false)
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)

  const toastID = useRef(null)

  const {
    data: addresses,
    status,
    error,
  }: any = useQuery('listUserAddress', listUserAddress)

  function useDeleteAddressHandler() {
    const queryClient = useQueryClient()

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

  function selectAddressHandler(addressId: string) {
    loadingToast(toastID)
    return updateShippingAddressById(addressId)
      .then(() => {
        updateToast(toastID, 'success', 'address selected')
        setDropdown(false)
        setCheckoutForm({
          ...checkoutForm,
          shipping: {
            form: null,
          },
        })
      })
      .catch(() => {
        updateToast(toastID, 'error', 'error selecting address')
        setCheckoutForm({
          ...checkoutForm,
          shipping: {
            form: null,
          },
        })
      })
  }

  function dropdownHandler() {
    setDropdown(!dropdown)
  }

  return {
    dropdownHandler,
    addresses,
    useDeleteAddressHandler,
    status,
    error,
    dropdown,
    selectAddressHandler,
  }
}
