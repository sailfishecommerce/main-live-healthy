import { useFormContext } from 'react-hook-form'

import countries from '@/json/countries.json'
import type { countriesType, InputType } from '@/typings/input-type'

export function SelectCountry({ input, className }: InputType) {
  const validCountry: countriesType[] = countries.data?.filter(
    (country) => country.Iso2
  )
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={`select-element ${className}`}>
      {input.label && <label htmlFor={input.id}>{input.label}</label>}
      <select
        required
        placeholder="Select Country"
        className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        id="checkout-country"
        aria-label="select countries"
        {...register(input.name, { required: true })}
      >
        <option value="">Select Country</option>
        {validCountry.map((country) => (
          <option key={country.Iso2} value={country.Iso2.toLowerCase()}>
            {country.name}
          </option>
        ))}
      </select>
      <p className="text-red-500">{errors[input.name]?.message}</p>
    </div>
  )
}

export function Input({ input, className, setValue, values }: InputType) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const inputName = values ? values[`${input.name}`] : ''

  const textInputValue =
    inputName?.length > 0 ? { value: setValue(`${input.name}`, inputName) } : ''

  return (
    <div className={`input-element my-3 flex flex-col ${className}`}>
      {input.label && <label htmlFor={input.id}>{input.label}</label>}
      <input
        {...textInputValue}
        type={input.inputType}
        className="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={input.id}
        aria-invalid={errors[input.name] ? 'true' : 'false'}
        placeholder={input.placeholder}
        {...register(input.name)}
      />
      <p className="text-red-500">{errors[input.name]?.message}</p>
    </div>
  )
}
