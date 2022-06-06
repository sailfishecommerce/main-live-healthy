/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { yupResolver } from '@hookform/resolvers/yup'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import SelectFormElement from '@/components/Form/SelectFormElement'
import checkoutFormContent from '@/json/checkout-form.json'
import { submitCheckoutFormAtom } from '@/lib/atomConfig'
import type { FormInputsProps } from '@/typings/input-type'

const schema = yup
  .object({
    country: yup.string().required(),
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    address: yup.string().required(),
    district: yup.string().required(),
    region: yup.string().required(),
    zip: yup.string().required(),
    phone: yup.string().required(),
  })
  .required()

export default function ShippingAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsProps>({ resolver: yupResolver(schema) })
  const [submitCheckoutForm] = useAtom(submitCheckoutFormAtom)

  const onSubmit = (data: FormInputsProps) => console.log('form-data', data)

  useEffect(() => {
    if (submitCheckoutForm) {
      console.log('rendered')
      handleSubmit(onSubmit)
    }
  }, [submitCheckoutForm])

  return (
    <>
      <h3 className="font-bold my-5 text-lg">Shipping address</h3>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
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
