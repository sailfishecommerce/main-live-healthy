export type countriesType = {
  name: string
  Iso2: any | string
  Iso3: string | null
}
export interface FormInputType {
  input: {
    name: string
    type: string
    id: string
    placeholder: string
    label?: string
    inputType?: string
    className?: string
  }
  onChangeHandler: (e: any) => void
  className?: string
}

export interface InputType {
  input: {
    name: string
    type: string
    id: string
    placeholder: string
    label?: string
    inputType?: string
    className?: string
  }
  className?: string
  setValue?: any
  values?: any
}

export interface FormInputsProps {
  country: string
  firstName: string
  lastName: string
  address: string
  district: string
  region: string
  name: string
  phone: string
}

export type inputType =
  | 'address'
  | 'country'
  | 'district'
  | 'firstName'
  | 'lastName'
  | 'name'
  | 'phone'
  | 'region'
