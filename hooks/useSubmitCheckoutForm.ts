import { useAtom } from 'jotai'
import { useRef } from 'react'
import { useQuery } from 'react-query'

import { useAccount, useToast } from '@/hooks'
import useModal from '@/hooks/useModal'
import useSubmitCheckoutFormAction from '@/hooks/useSubmitCheckoutFormAction'
import useVboutAction from '@/hooks/useVboutAction'
import { checkoutAddressAtom, checkoutFormAtom } from '@/lib/atomConfig'

export default function useSubmitCheckoutForm() {
  const { createVboutCartAction, addCartItemAction } = useVboutAction()
  const { getUserAccount, createUserAccountAtCheckout } = useAccount()
  const { useCreateUserAddress, useUpdateUserAddress } =
    useSubmitCheckoutFormAction()
  const { updateModalView } = useModal()
  const [checkoutAddress, setCheckoutAddress] = useAtom(checkoutAddressAtom)
  const { loadingToast, updateToast } = useToast()
  const toastID = useRef(null)
  const { data: userDetails } = useQuery('userDetails', getUserAccount)
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)
  const createUserAddressMutate = useCreateUserAddress()
  const updateCheckoutAddressMutate = useUpdateUserAddress()

  function displayBillingAddress() {
    setCheckoutForm({
      ...checkoutForm,
      billing: {
        form: null,
      },
    })
  }

  const onSubmitHandler = (addressType: 'billing' | 'shipping', data: any) => {
    createVboutCartAction(data)
    addCartItemAction(data)
    setCheckoutAddress({
      ...checkoutAddress,
      [addressType]: data,
    })
    if (addressType === 'billing') {
      displayBillingAddress()
      updateCheckoutAddressMutate.mutate({ addressType, data })
    }
    if (addressType === 'shipping' && userDetails !== null) {
      createUserAddressMutate.mutate(data)
      updateCheckoutAddressMutate.mutate({ addressType, data })
    } else if (userDetails === null && addressType === 'shipping') {
      loadingToast(toastID)
      createUserAccountAtCheckout(data)
        .then((response) => {
          if (response !== null && response?.email?.code === 'UNIQUE') {
            updateToast(
              toastID,
              'error',
              'you have an existing account with us, please login'
            )
            updateModalView('MODAL_LOGIN')
          } else {
            updateToast(toastID, 'success', 'account created')
            createUserAddressMutate.mutate(data)
            updateCheckoutAddressMutate.mutate({ addressType, data })
          }
        })
        .catch((err) => {
          updateToast(toastID, 'error', err.message)
        })
    }
  }

  return { onSubmitHandler, userDetails, checkoutForm }
}
