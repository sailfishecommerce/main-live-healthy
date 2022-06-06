import AddressAutoComplete from '@/components/Form/AddressAutocomplete'
import { Input, SelectCountry } from '@/components/Form/NewFormElement'

interface InputType {
  input: {
    name: string
    type: string
    id: string
    placeholder: string
    label?: string
    inputType?: string
  }
  className: string
  form: { register: any; errors: any }
  setValue: (name: string, value: unknown, config?: unknown) => void
}

export default function SelectFormElement({
  input,
  className,
  form,
  setValue,
}: InputType) {
  switch (input.type) {
    case 'input':
      return <Input input={input} className={className} form={form} />
    case 'selectCountry':
      return <SelectCountry input={input} className={className} form={form} />
    case 'AddressAutocomplete':
      return <AddressAutoComplete setValue={setValue} form={form} />
    default:
      return null
  }
}
