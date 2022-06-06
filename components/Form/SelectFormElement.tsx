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
}

export default function SelectFormElement({ input, className }: InputType) {
  switch (input.type) {
    case 'input':
      return <Input input={input} className={className} />
    case 'selectCountry':
      return <SelectCountry input={input} className={className} />
    case 'AddressAutocomplete': {
      return <AddressAutoComplete />
    }

    default:
      return null
  }
}
