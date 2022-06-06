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
}

export default function SelectFormElement({
  input,
  className,
  form,
}: InputType) {
  switch (input.type) {
    case 'input':
      return <Input input={input} className={className} form={form} />
    case 'selectCountry':
      return <SelectCountry input={input} className={className} form={form} />

    default:
      return null
  }
}
