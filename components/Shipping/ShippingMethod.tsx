import { useState } from 'react'

import ShippingMethodTag from '@/components/Tag/ShippingMethodTag'
import shippingTagsJson from '@/json/shipping.json'

export default function ShippingMethod() {
  const [shippingMethod, setShippingMethod] = useState<string | null>(null)

  function updateShippingMethod(value: string) {
    setShippingMethod(value)
  }
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Shipping method</h4>
      <div className="shipping-methods flex flex-col">
        {shippingTagsJson.map((shippingMethodItem, index) => (
          <ShippingMethodTag
            key={index}
            content={shippingMethodItem}
            shippingMethod={shippingMethod}
            updateShippingMethod={updateShippingMethod}
          />
        ))}
      </div>
    </div>
  )
}
