import countries from '@/json/countries.json'
import type {
  countriesType,
  FormInputType,
  InputType,
} from '@/typings/input-type'

export function SelectCountry({ input, className, form }: InputType) {
  const validCountry: countriesType[] = countries.data?.filter(
    (country) => country.Iso2
  )
  const { register, errors } = form

  return (
    <div className={`select-element ${className}`}>
      {input.label && <label>{input.label}</label>}
      <select
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
        name={input.name}
        {...(register(input.name), { required: true })}
      >
        <option selected value="">
          Select Country
        </option>
        {validCountry.map((country) => (
          <option key={country.Iso2} value={country.Iso2}>
            {country.name}
          </option>
        ))}
      </select>
      <p className="text-red-500">{errors[input.name]?.message}</p>
    </div>
  )
}

export function Input({ input, className, form }: InputType) {
  const { register, errors } = form
  return (
    <div className={`input-element my-3 flex flex-col ${className}`}>
      {input.label && <label>{input.label}</label>}
      <input
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
        placeholder={input.placeholder}
        {...register(input.name)}
      />
      <p className="text-red-500">{errors[input.name]?.message}</p>
    </div>
  )
}

export function FormInput({
  input,
  className,
  onChangeHandler,
}: FormInputType) {
  return (
    <div className={`input-element my-3 flex flex-col ${className}`}>
      {input.label && <label>{input.label}</label>}
      <input
        required
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
        placeholder={input.placeholder}
        onChange={onChangeHandler}
      />
    </div>
  )
}
