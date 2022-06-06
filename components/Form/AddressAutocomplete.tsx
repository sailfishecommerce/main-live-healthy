/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect, useRef, useCallback } from 'react'

import { userAddressAtom } from '@/lib/atomConfig'
import type { inputType } from '@/typings/input-type'

let autoComplete: any

declare global {
  interface Window {
    google: any
  }
}

const loadScript = (url: string, callback: () => void) => {
  const script: any = document.createElement('script') // create script tag
  script.type = 'text/javascript'

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => callback()
  }

  script.src = url // load by url
  document.getElementsByTagName('head')[0].appendChild(script) // append to head
}

// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(
  updateQuery: any,
  autoCompleteRef: any,
  selectedCountry: any,
  setUserAddress: (query: any) => void
) {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['establishment'] }
  )
  autoComplete.setComponentRestrictions({ country: selectedCountry })
  autoComplete.setFields(['address_components'])

  // add a listener to handle when the place is selected
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery, setUserAddress)
  )
}

function handlePlaceSelect(
  updateQuery: any,
  setUserAddress: (query: any) => void
) {
  const addressObject = autoComplete.getPlace() // get place from google api
  const query = addressObject?.address_components
  setUserAddress(query)

  function filterLocation(location: string) {
    const place = query?.filter(
      (adr: { types: string[] }) => adr.types[0] === location
    )

    const rightPlace = place[0]?.long_name
      ? place[0]?.long_name
      : place[0]?.short_name
    return rightPlace
  }

  const address = {
    address: `${filterLocation('street_number')}  ${filterLocation(
      'route'
    )}  ${filterLocation('neighborhood')} ${filterLocation(
      'locality'
    )}`?.replaceAll('undefined', ''),
    district: filterLocation('locality')?.replace('undefined', ''),
    region: filterLocation('administrative_area_level_1')?.replace(
      'undefined',
      ''
    ),
    zip: filterLocation('postal_code')?.replace('undefined', ''),
  }
  updateQuery.setValues(
    {
      ...updateQuery.values,
      ...address,
    },
    false
  )
}

interface Props {
  setValue: (name: inputType, value: unknown, config?: unknown) => void
  form: {
    register: any
    errors: {
      address: {
        message: string
      }
    }
  }
}

export default function AddressAutoComplete({ form, setValue }: Props) {
  const { errors, register } = form
  const autoCompleteRef = useRef(null)
  const countryCode = 'values.country'
  const [, setUserAddress] = useAtom(userAddressAtom)

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`,
      () =>
        handleScriptLoad(setValue, autoCompleteRef, countryCode, setUserAddress)
    )
  }, [countryCode])

  const updateInput = useCallback(function (e: any) {
    return setValue('address', e.target.value)
  }, [])

  return (
    <div className="mb-1 flex flex-col px-2 w-full">
      <input
        ref={autoCompleteRef}
        placeholder="Address"
        name="address"
        className="form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        autoComplete="true"
        onChange={updateInput}
        {...register('address')}
      />
      <p className="text-red-500">{errors.address?.message}</p>
    </div>
  )
}
