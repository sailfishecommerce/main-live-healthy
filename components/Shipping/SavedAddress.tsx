/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import getCountry from '@/lib/getCountry'

export default function SavedAddress() {
  const { listUserAddress } = useAccount()
  const [dropdown, setDropdown] = useState(false)

  const { data: addresses, status } = useQuery(
    'listUserAddress',
    listUserAddress
  )

  type addressType = {
    active: boolean
    id: string
    address1: string
    address2: string
    city: string
    country: string
    firstName: string
    lastName: string
    name: string
    phone: string
    state: string
    zip: string
  }

  function dropdownHandler() {
    setDropdown(!dropdown)
  }

  return (
    <div>
      <button
        type="button"
        className="dropdown h-12 items-center justify-center font-bold flex w-full border"
        onClick={dropdownHandler}
      >
        Select Shipping Address from Saved Address
        <span className="ml-6">
          {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </button>
      {dropdown && (
        <div className="saved-address dropdown-list">
          {status === 'error'
            ? 'unable to fetch address'
            : status === 'loading'
            ? 'fetching user saved addresses'
            : addresses.results.map((address: addressType) => {
                const country = getCountry(address.country)
                return (
                  address.active && (
                    <div
                      className="address-list flex flex-col my-2 border-b pb-2"
                      key={address.id}
                    >
                      <div className="content">
                        <h4 className="text-sm">
                          {address.zip}, {address.address1}, {address.address1},{' '}
                          {address.city}, {address.state},{country}
                        </h4>
                        <p className="text-xs">
                          {address.name}- {address.phone}
                        </p>
                      </div>
                      <div className="button-group flex items-end justify-end">
                        <button
                          type="button"
                          className="bg-mountain-green mr-4 text-white px-2 py-1 text-xs"
                        >
                          Select Address
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1 text-xs"
                        >
                          Delete Address
                        </button>
                      </div>
                    </div>
                  )
                )
              })}
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
