import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAccount, useToast } from '@/hooks'

export default function useSavedAddress() {
  const { listUserAddress, deleteUserAddress, updateShippingAddressById } =
    useAccount()
  const { loadingToast, updateToast } = useToast()
  const [dropdown, setDropdown] = useState(false)
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
      })
      .catch(() => {
        updateToast(toastID, 'error', 'error selecting address')
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
