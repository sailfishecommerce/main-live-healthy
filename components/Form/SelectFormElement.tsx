import dynamic from 'next/dynamic'

import { Input, SelectCountry } from '@/components/Form/NewFormElement'

const DynamicAddressAutoComplete = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AddressAutoComplete' */ '@/components/Form/AddressAutocomplete'
    ),
  {
    ssr: false,
  }
)

const DynamicGoogleAutoComplete = dynamic(
  () =>
    import(
      /* webpackChunkName: 'GoogleAutoComplete' */ '@/components/Form/GoogleAutoComplete'
    ),
  {
    ssr: false,
  }
)

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
  setValue?: any
  values?: any
}

export default function SelectFormElement({
  input,
  className,
  setValue,
  values,
}: InputType) {
  switch (input.type) {
    case 'input':
      return (
        <Input
          input={input}
          className={className}
          setValue={setValue}
          values={values}
        />
      )
    case 'selectCountry':
      return <SelectCountry input={input} className={className} />
    case 'AddressAutocomplete': {
      return <DynamicAddressAutoComplete />
    }
    case 'GoogleAutoComplete': {
      return <DynamicGoogleAutoComplete />
    }

    default:
      return null
  }
}
