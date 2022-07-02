import { useAtom } from 'jotai'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import useAccount from '@/hooks/useAccount'
import useToast from '@/hooks/useToast'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function useSubmitCheckoutFormAction() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()
  const { createUserAddress, updateCheckoutAddress } = useAccount()
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)

  function useCreateUserAddress() {
    const toastID = useRef(null)

    return useMutation((data: any) => createUserAddress(data), {
      mutationKey: 'createUserAddress',
      onMutate: () => {
        loadingToast(toastID)
      },
      onSettled: () => {
        queryClient.invalidateQueries('listUserAddress')
        queryClient.invalidateQueries('cart')
      },
      onSuccess: () => {
        updateToast(toastID, 'success', 'address created')
      },
      onError: () => {
        updateToast(toastID, 'error', 'error creating address')
      },
    })
  }

  function useUpdateUserAddress() {
    const toastID = useRef(null)

    return useMutation(
      ({ addressType, data }: any) => updateCheckoutAddress(addressType, data),
      {
        mutationKey: 'updateCheckoutAddress',
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('listUserAddress')
          queryClient.invalidateQueries('cart')
        },
        onSuccess: (_, variables) => {
          if (variables.addressType) {
            setCheckoutForm({
              ...checkoutForm,
              [variables.addressType]: {
                form: null,
              },
            })
          }
          updateToast(toastID, 'success', `address info updated`)
        },
        onError: () => {
          updateToast(toastID, 'error', 'error updating address')
        },
      }
    )
  }

  return { useCreateUserAddress, useUpdateUserAddress }
}
