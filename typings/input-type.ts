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
  form: { register: any; errors: any }
}
