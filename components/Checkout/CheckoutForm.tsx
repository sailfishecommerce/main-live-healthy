/* eslint-disable react/no-array-index-key */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'

import ContactInformationForm from '@/components/Checkout/ContactInformationForm'
import SelectFormElement from '@/components/Form/SelectFormElement'
import {
  billingSchema,
  shippingSchema,
} from '@/components/Form/schema/ShippingSchema'
import useSubmitCheckoutForm from '@/hooks/useSubmitCheckoutForm'
import checkoutFormContent from '@/json/checkout-form.json'
import type { FormInputsProps } from '@/typings/input-type'
import type { AddressFormProps } from '@/typings/types'

export default function CheckoutForm({ addressType }: AddressFormProps) {
  const { onSubmitHandler, userDetails } = useSubmitCheckoutForm()

  const formSchema = addressType === 'billing' ? billingSchema : shippingSchema

  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(formSchema),
  })

  return (
    <FormProvider {...methods}>
      <form
        className="mt-4"
        onSubmit={methods.handleSubmit((data) =>
          onSubmitHandler(addressType, data)
        )}
      >
        {addressType === 'shipping' && (
          <ContactInformationForm
            values={userDetails}
            setValue={methods.setValue}
          />
        )}
        {checkoutFormContent.personalDetails.content.map((inputRow, index) => {
          const inputStyle =
            inputRow.length === 1
              ? 'w-full mx-2'
              : `w-1/${inputRow.length} mx-2`
          return (
            <div key={index} className="flex">
              {inputRow.map((input) => (
                <SelectFormElement
                  input={input}
                  key={input.id}
                  className={inputStyle}
                  setValue={methods.setValue}
                  values={userDetails}
                />
              ))}
            </div>
          )
        })}
        {addressType === 'shipping' && (
          <div className="save-info border-b pb-4 mt-2 flex items-center">
            <input type="checkbox" />{' '}
            <p className="ml-4">Save this information for next time</p>
          </div>
        )}
        <button
          type="submit"
          className={`w-1/2 mx-auto flex items-center justify-center p-1 text-md my-4 mt-1 my-3 bg-mountain-green text-white shadow-lg rounded-xl`}
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
