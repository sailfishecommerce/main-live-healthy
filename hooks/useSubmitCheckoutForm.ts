import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import useSubmitCheckoutFormAction from '@/hooks/useSubmitCheckoutFormAction'
import useVboutAction from '@/hooks/useVboutAction'
import { checkoutFormAtom } from '@/lib/atomConfig'

export default function useSubmitCheckoutForm() {
  const { createVboutCartAction, addCartItemAction } = useVboutAction()
  const { getUserAccount, createUserAccountAtCheckout } = useAccount()
  const { useCreateUserAddress, useUpdateUserAddress } =
    useSubmitCheckoutFormAction()
  const { data: userDetails } = useQuery('userDetails', getUserAccount)
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)

  const createUserAddressMutate = useCreateUserAddress()
  const updateCheckoutAddressMutate = useUpdateUserAddress()

  const onSubmitHandler = (addressType: 'billing' | 'shipping', data: any) => {
    createVboutCartAction(data)
    addCartItemAction(data)
    if (addressType === 'billing') {
      displayBillingAddress()
    }
    if (addressType === 'shipping' && userDetails !== null) {
      createUserAddressMutate.mutate(data)
    } else if (userDetails === null) {
      createUserAccountAtCheckout(data)
        .then((response) => console.log('response-crateuser', response))
        .catch((err) => console.log('err-crateuser', err))
      createUserAddressMutate.mutate(data)
    }
    updateCheckoutAddressMutate.mutate({ addressType, data })
  }

  function displayBillingAddress() {
    setCheckoutForm({
      ...checkoutForm,
      billing: {
        form: null,
      },
    })
  }

  return { onSubmitHandler, userDetails, checkoutForm }
}
