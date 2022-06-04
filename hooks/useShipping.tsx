import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useSwell from '@/hooks/useSwell'
import useToast from '@/hooks/useToast'

export default function useShipping() {
  const { swellInit } = useSwell()

  async function getShippingRates() {
    const { swell } = await swellInit()
    return await swell.cart.getShippingRates()
  }

  async function updateShippingRate(shippingRate: string) {
    const { swell } = await swellInit()
    return await swell.cart.update({
      shipping: { service: shippingRate },
    })
  }

  return { getShippingRates, updateShippingRate }
}

export function useShippingMutation() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()
  const { updateShippingRate } = useShipping()

  function useUpdateShippingRate() {
    const toastID = useRef(null)

    return useMutation(
      (shippingRate: any) => updateShippingRate(shippingRate),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, 'shipping rate updated')
        },
        onError: () => {
          updateToast(toastID, toast.TYPE.ERROR, 'error updating shipping rate')
        },
      }
    )
  }
  return { useUpdateShippingRate }
}
