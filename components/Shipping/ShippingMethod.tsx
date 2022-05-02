import { useState } from 'react'
import { useQuery } from 'react-query'

import ShippingMethodTag from '@/components/Tag/ShippingMethodTag'
import useShipping from '@/hooks/useShipping'

export default function ShippingMethod() {
  const [shippingMethod, setShippingMethod] = useState<string | null>(null)

  function updateShippingMethod(value: string) {
    setShippingMethod(value)
  }
  const { getShippingRates } = useShipping()

  const { data, status } = useQuery('getShippingRate', getShippingRates)

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Shipping method</h4>
      <div className="shipping-methods flex flex-col">
        {status === 'success' &&
          data.services.map((shippingMethodItem: any) => (
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
