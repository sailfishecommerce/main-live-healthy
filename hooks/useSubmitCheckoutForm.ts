import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import useSubmitCheckoutFormAction from '@/hooks/useSubmitCheckoutFormAction'
import useVboutAction from '@/hooks/useVboutAction'

export default function useSubmitCheckoutForm() {
  const { createVboutCartAction, addCartItemAction } = useVboutAction()
  const { getUserAccount } = useAccount()
  const { useCreateUserAddress, useUpdateUserAddress } =
    useSubmitCheckoutFormAction()
  const { data: userDetails } = useQuery('userDetails', getUserAccount)

  const createUserAddressMutate = useCreateUserAddress()
  const updateCheckoutAddressMutate = useUpdateUserAddress()

  const onSubmitHandler = (addressType: 'billing' | 'shipping', data: any) => {
    createVboutCartAction(data)
    addCartItemAction(data)
    if (addressType === 'shipping') {
      createUserAddressMutate.mutate(data)
    }
    updateCheckoutAddressMutate.mutate({ addressType, data })
  }

  return { onSubmitHandler, userDetails }
}
