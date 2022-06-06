/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import ContactInformationForm from '@/components/Checkout/ContactInformationForm'
import ShippingAddressFormWrapper from '@/components/Form/ShippingAddressForm'
import { shippingSchema } from '@/components/Form/schema/ShippingSchema'
import type { FormInputsProps } from '@/typings/input-type'

export default function ShippingAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsProps>({ resolver: yupResolver(shippingSchema) })

  const onSubmit = (data: FormInputsProps) => console.log('form-data', data)

  return (
    <>
      <h3 className="font-bold my-5 text-lg">Shipping address</h3>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <ShippingAddressFormWrapper form={{ register, errors }}>
          <ContactInformationForm form={{ register, errors }} />
        </ShippingAddressFormWrapper>
      </form>
    </>
  )
}
