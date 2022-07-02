/* eslint-disable no-nested-ternary */
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

import useSavedAddress from '@/hooks/useSavedAddress'
import getCountry from '@/lib/getCountry'
import type { addressType } from '@/typings/types'

export default function SavedAddressDropdown() {
  const {
    dropdownHandler,
    addresses,
    dropdown,
    useDeleteAddressHandler,
    status,
    useSelectAddressHandler,
    error,
  } = useSavedAddress()

  const deleteAddress = useDeleteAddressHandler()
  const selectAddress = useSelectAddressHandler()

  return (
    <div>
      <button
        type="button"
        className="dropdown h-12 hover:bg-gray-200 items-center justify-center font-bold flex w-full border"
        onClick={dropdownHandler}
      >
        Select Shipping Address from Saved Address
        <span className="ml-6">
          {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </button>
      {dropdown && (
        <div className="saved-address dropdown-list">
          {status === 'error' ? (
            <p className="font-bold text-red-500">{error?.message}</p>
          ) : status === 'loading' ? (
            'fetching user saved addresses...'
          ) : (
            addresses.results.map((address: addressType) => {
              const country = getCountry(address.country)
              return (
                address.active && (
                  <div
                    className="address-list flex flex-col my-2 border-b pb-2"
                    key={address.id}
                  >
                    <div className="content">
                      <h4 className="text-sm">
                        {address.zip}, {address.address1}, {address.city},
                        {address.state},{country}
                      </h4>
                      <p className="text-xs">
                        {address.name}- {address.phone}
                      </p>
                    </div>
                    <div className="button-group flex items-end justify-end">
                      <button
                        type="button"
                        className="bg-mountain-green mr-4 text-white px-2 py-1 text-xs"
                        onClick={() => selectAddress.mutate(address.id)}
                      >
                        Select Address
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 text-white px-2 py-1 text-xs hover:bg-red-600"
                        onClick={() => deleteAddress.mutate(address.id)}
                      >
                        Delete Address
                      </button>
                    </div>
                  </div>
                )
              )
            })
          )}
        </div>
      )}
      <style global jsx>
        {`
          .saved-address.dropdown-list {
            max-height: 250px;
            overflow-y: scroll;
          }
        `}
      </style>
    </div>
  )
}
