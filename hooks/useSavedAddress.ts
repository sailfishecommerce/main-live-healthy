import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAccount, useToast } from '@/hooks'

export default function useSavedAddress() {
  const { listUserAddress, deleteUserAddress } = useAccount()
  const { loadingToast, updateToast } = useToast()
  const [dropdown, setDropdown] = useState(false)

  const { data: addresses, status } = useQuery(
    'listUserAddress',
    listUserAddress
  )

  function useDeleteAddressHandler() {
    const toastID = useRef(null)
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

  function dropdownHandler() {
    setDropdown(!dropdown)
  }

  return {
    dropdownHandler,
    addresses,
    useDeleteAddressHandler,
    status,
    dropdown,
  }
}
