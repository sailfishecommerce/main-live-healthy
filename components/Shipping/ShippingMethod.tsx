import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

import ShippingMethodTag from '@/components/Tag/ShippingMethodTag'
import useShipping, { useShippingMutation } from '@/hooks/useShipping'
import { watchCheckoutFormAtom } from '@/lib/atomConfig'

interface Props {
  shippingMethod: string
}

export default function ShippingMethod({ shippingMethod }: Props) {
  const { useUpdateShippingRate } = useShippingMutation()
  const { getShippingRates } = useShipping()
  const { data, status } = useQuery('getShippingRate', getShippingRates)
  const updateShippingRate = useUpdateShippingRate()
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )
  function updateShippingMethod(value: string) {
    updateShippingRate.mutate(value)
    if (!watchCheckoutForm.includes('shipping-rate')) {
      setWatchCheckoutForm([...watchCheckoutForm, 'shipping-rate'])
    }
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Shipping method</h4>
      <div className="shipping-methods flex flex-col">
        {status === 'success' &&
          data?.services?.map((shippingMethodItem: any) => (
            <ShippingMethodTag
              key={shippingMethodItem.id}
              content={shippingMethodItem}
              shippingMethod={shippingMethod}
              updateShippingMethod={updateShippingMethod}
            />
          ))}
      </div>
    </div>
  )
}
