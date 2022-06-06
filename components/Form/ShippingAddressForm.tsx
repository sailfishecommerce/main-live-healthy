/* eslint-disable react/no-array-index-key */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import SelectFormElement from '@/components/Form/SelectFormElement'
import checkoutFormContent from '@/json/checkout-form.json'

interface FormInputsProps {
  country: string
  firstName: string
  lastName: string
  address: string
  district: string
  region: string
  name: string
  phone: string
}

const schema = yup
  .object({
    country: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    district: yup.string().required(),
    region: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
  })
  .required()

export default function ShippingAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsProps>({ resolver: yupResolver(schema) })

  const onSubmit = (data: FormInputsProps) => console.log('form-data', data)

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
      </form>
    </>
  )
}
