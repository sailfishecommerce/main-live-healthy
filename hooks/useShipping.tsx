import axios from 'axios'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useToast from '@/hooks/useToast'

type shippingMutationType = {
  cartId: string
  rate: {
    courier_id: string
    courier_name: string
    total_charge: number
  }
}

export default function useShippingMutation() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()

  function updateCartShipping(
    cartId: string,
    rate: shippingMutationType['rate']
  ) {
    return axios.put('/api/update-shipping', {
      cartId,
      shipping: {
        service: rate.courier_id,
        service_name: rate.courier_name,
        price: rate.total_charge,
      },
    })
  }

  function useUpdateShippingRate() {
    const toastID = useRef(null)

    return useMutation(
      ({ cartId, rate }: shippingMutationType) =>
        updateCartShipping(cartId, rate),
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
