/* eslint-disable react/no-array-index-key */
import type { PropsWithChildren } from 'react'

import SelectFormElement from '@/components/Form/SelectFormElement'
import checkoutFormContent from '@/json/checkout-form.json'

interface ShippingAddressFormProps {
  form: {
    register: any
    errors: any
  }
}

export default function ShippingAddressForm({
  children,
  form,
}: PropsWithChildren<ShippingAddressFormProps>) {
  return (
    <>
      {children}
      {checkoutFormContent.personalDetails.content.map((inputRow, index) => {
        const inputStyle =
          inputRow.length === 1 ? 'w-full mx-2' : `w-1/${inputRow.length} mx-2`
        return (
          <div key={index} className="flex">
            {inputRow.map((input) => (
              <SelectFormElement
                input={input}
                key={input.id}
                className={inputStyle}
                form={form}
              />
            ))}
          </div>
        )
      })}
      <div className="save-info border-b pb-4 mt-2 flex items-center">
        <input type="checkbox" />{' '}
        <p className="ml-4">Save this information for next time</p>
      </div>
      <input
        type="submit"
        className={`w-1/2 mx-auto flex items-center justify-center p-1 text-md my-4 mt-1 my-3 bg-mountain-green text-white shadow-lg rounded-xl`}
      />
    </>
  )
}
