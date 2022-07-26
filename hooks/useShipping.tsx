/* eslint-disable no-console */
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import useToast from '@/hooks/useToast'
import { courierAtom } from '@/lib/atomConfig'

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
  const [, setCourier] = useAtom(courierAtom)

  function updateCartShipping(
    cartId: string,
    rate: shippingMutationType['rate']
  ) {
    console.log('rate-rate', rate)
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
        onSuccess: (_, variables) => {
          const { rate } = variables
          updateToast(toastID, 'success', 'shipping rate updated')
          setCourier(rate.courier_id)
        },
        onError: () => {
          updateToast(toastID, 'error', 'error updating shipping rate')
        },
      }
    )
  }
  return { useUpdateShippingRate }
}
