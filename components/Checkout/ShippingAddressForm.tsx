/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import ContactInformationForm from '@/components/Checkout/ContactInformationForm'
import SelectFormElement from '@/components/Form/SelectFormElement'
import { shippingSchema } from '@/components/Form/schema/ShippingSchema'
import checkoutFormContent from '@/json/checkout-form.json'
import type { FormInputsProps } from '@/typings/input-type'

export default function ShippingAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormInputsProps>({
    resolver: yupResolver(shippingSchema),
  })

  const onSubmit = (data: FormInputsProps) => console.log('form-data', data)

  return (
    <>
      <h3 className="font-bold my-5 text-lg">Shipping address</h3>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <ContactInformationForm form={{ register, errors }} />
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
                  form={{ register, errors }}
                  setValue={setValue}
                  control={control}
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
      </form>
    </>
  )
}
