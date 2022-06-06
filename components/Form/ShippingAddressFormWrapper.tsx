/* eslint-disable react/no-array-index-key */
import type { PropsWithChildren } from 'react'

import SelectFormElement from '@/components/Form/SelectFormElement'
import checkoutFormContent from '@/json/checkout-form.json'
import type { inputType } from '@/typings/input-type'

interface ShippingAddressFormProps {
  form: {
    register: any
    errors: any
    isDirty: boolean
    isValid: boolean
  }
  setValue: (name: inputType, value: unknown, config?: unknown) => void
}

export default function ShippingAddressFormWrapper({
  children,
  form,
  setValue,
}: PropsWithChildren<ShippingAddressFormProps>) {
  const { isDirty, isValid } = form
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
                setValue={setValue}
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
        disabled={!isDirty || !isValid}
      />
    </>
  )
}
