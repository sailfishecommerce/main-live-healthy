/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useCart } from '@/hooks'
import { selectShippingAddressAtom } from '@/lib/atomConfig'
import getCountry from '@/lib/getCountry'

export default function DisplaySavedAddress() {
  const { useCartData } = useCart()
  const { data: cart, status } = useCartData()
  const [, setSelectSavedAddress] = useAtom(selectShippingAddressAtom)

  function updateDropdownHandler() {
    setSelectSavedAddress(false)
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
              <span className="font-bold mr-1">Name:</span> {cart.shipping.name}
            </li>
            <li>
              <span className="font-bold mr-1">Zip code:</span>
              {cart.shipping.zip}
            </li>
            <li>
              <span className="font-bold mr-1">Address:</span>
              {cart.shipping.address1}
            </li>
            <li>
              <span className="font-bold mr-1">City:</span> {cart.shipping.city}
            </li>
            <li>
              <span className="font-bold mr-1">State:</span>{' '}
              {cart.shipping.state}
            </li>
            <li>
              <span className="font-bold mr-1">Country:</span>
              {getCountry(cart.shipping.country)}
            </li>
            <li>
              <span className="font-bold mr-1">Phone:</span>{' '}
              {cart.shipping.phone}
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
