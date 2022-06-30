/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import { yupResolver } from '@hookform/resolvers/yup'
import { useAtom } from 'jotai'
import { useForm, FormProvider } from 'react-hook-form'
import { useQuery } from 'react-query'

import ContactInformationForm from '@/components/Checkout/ContactInformationForm'
import SelectFormElement from '@/components/Form/SelectFormElement'
import { shippingSchema } from '@/components/Form/schema/ShippingSchema'
import { useAccount } from '@/hooks'
import useVboutAction from '@/hooks/useVboutAction'
import checkoutFormContent from '@/json/checkout-form.json'
import { paymentFormAtom } from '@/lib/atomConfig'
import type { FormInputsProps } from '@/typings/input-type'
import type { AddressFormProps } from '@/typings/types'

export default function CheckoutForm({ addressType }: AddressFormProps) {
  const { createVboutCartAction, addCartItemAction } = useVboutAction()
  const { getUserAccount, updateCheckoutAddress } = useAccount()
  const { data: userDetails } = useQuery('userDetails', getUserAccount)

  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(shippingSchema),
  })
  const [, setShippingForm] = useAtom(paymentFormAtom)

  const onSubmit = (data: any) => {
    console.log('form-data', data)
    createVboutCartAction(data)
    addCartItemAction(data)
    updateCheckoutAddress(addressType, data)
      .then((response) =>
        console.log('response-updateCheckoutAddress', response)
      )
      .catch((err) => console.log('err-updateCheckoutAddress', err))
    // setShippingForm({
    //   form: data,
    //   completed: true,
    // })
  }

  return (
    <FormProvider {...methods}>
      <form className="mt-4" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <input
          type="submit"
          className={`w-1/2 mx-auto flex items-center justify-center p-1 text-md my-4 mt-1 my-3 bg-mountain-green text-white shadow-lg rounded-xl`}
        />
      </form>
    </FormProvider>
  )
}
