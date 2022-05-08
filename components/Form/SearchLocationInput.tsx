/* eslint-disable dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, memo } from 'react'

import { updateUserAddress } from '@/redux/payment-slice'
import { useAppDispatch } from '@/redux/store'

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
      if (script.readyState === 'loadied' || script.readyState === 'complete') {
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
  dispatch: any
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
    handlePlaceSelect(updateQuery, dispatch)
  )
}

function handlePlaceSelect(updateQuery: any, dispatch: any) {
  const addressObject = autoComplete.getPlace() // get place from google api
  const query = addressObject?.address_components
  dispatch(updateUserAddress(query))

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

function SearchLocationInputComponent({ formik }: any) {
  const autoCompleteRef = useRef(null)
  const countryCode = formik.values.country
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`,
      () => handleScriptLoad(formik, autoCompleteRef, countryCode, dispatch)
    )
  }, [countryCode])

  function updateInput(e: any) {
    e.preventDefault()
    formik.setValues({
      ...formik.values,
      address: e.target.value,
    })
  }

  return (
    <div className="mb-1 flex flex-col px-2">
      <input
        ref={autoCompleteRef}
        placeholder="Address"
        value={formik.values.address}
        name="address"
        className="mb-2 border border-gray-200 rounded-md h-10 px-2 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
        autoComplete="true"
        onChange={updateInput}
      />
      <p className="text-danger errorText">
        {formik.errors['address'] &&
          formik.touched['address'] &&
          formik.errors['address']}
      </p>
      <style jsx>
        {`
          .errorText {
            font-size: 12px;
          }
        `}
      </style>
    </div>
  )
}
const SearchLocationInput = memo(SearchLocationInputComponent)
export default SearchLocationInput
