/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useCart } from '@/hooks'
import { checkoutFormAtom } from '@/lib/atomConfig'
import getCountry from '@/lib/getCountry'

export default function DisplaySavedAddress({ addressType }: any) {
  const { useCartData } = useCart()
  const { data: cart, status } = useCartData()
  const [checkoutForm, setCheckoutForm] = useAtom(checkoutFormAtom)

  function updateDropdownHandler() {
    setCheckoutForm({
      ...checkoutForm,
      [addressType]: {
        form: addressType,
      },
    })
  }

  return (
    <div>
      {status === 'error' ? (
        'unable to display saved address'
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : (
        <div className="saved-address">
          <ul className="pl-0 my-2">
            <li>
              <span className="font-bold mr-1">Name:</span>{' '}
              {cart[addressType].name}
            </li>
            <li>
              <span className="font-bold mr-1">Zip code:</span>
              {cart[addressType].zip}
            </li>
            <li>
              <span className="font-bold mr-1">Address:</span>
              {cart[addressType].address1}
            </li>
            <li>
              <span className="font-bold mr-1">City:</span>{' '}
              {cart[addressType].city}
            </li>
            <li>
              <span className="font-bold mr-1">State:</span>{' '}
              {cart[addressType].state}
            </li>
            <li>
              <span className="font-bold mr-1">Country:</span>
              {getCountry(cart[addressType].country)}
            </li>
            <li>
              <span className="font-bold mr-1">Phone:</span>{' '}
              {cart[addressType].phone}
            </li>
          </ul>
          <button
            type="button"
            className="bg-red-500 px-2 py-1 text-white rounded-md"
            onClick={updateDropdownHandler}
          >
            Update Shipping Address
          </button>
        </div>
      )}
    </div>
  )
}
