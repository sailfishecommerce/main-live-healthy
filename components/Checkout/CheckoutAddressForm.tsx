import { useAtom } from 'jotai'

import CheckoutForm from '@/components/Checkout/CheckoutForm'
import DisplaySavedAddress from '@/components/Shipping/DisplaySavedAddress'
import SavedAddressDropdown from '@/components/Shipping/SavedAddressDropdown'
import { checkoutFormAtom } from '@/lib/atomConfig'
import type { AddressFormProps } from '@/typings/types'

export default function CheckoutAddressForm({ addressType }: AddressFormProps) {
  const [checkoutForm] = useAtom(checkoutFormAtom)

  return (
    <>
      {addressType === 'shipping' && (
        <>
          <h3 className="font-bold my-5 text-lg">Shipping address</h3>
          <SavedAddressDropdown />
        </>
      )}
      {checkoutForm[addressType].form === addressType ? (
        <CheckoutForm addressType={addressType} />
      ) : (
        checkoutForm[addressType].form === null && (
          <DisplaySavedAddress addressType={addressType} />
        )
      )}
    </>
  )
}
