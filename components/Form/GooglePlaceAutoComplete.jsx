import Script from 'next/script'
import { useEffect, useRef } from 'react'

export default function GooglePlaceAutoComplete() {
  const ref = useRef(null)

  function placeAutocomplete(input) {
    const options = {
      componentRestrictions: { country: 'ng' },
      fields: ['formatted_address', 'name'],
      strictBounds: false,
      types: ['establishment'],
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    return autocomplete
  }

  useEffect(() => {
    const input = ref.current
    placeAutocomplete(input)
  }, [])

  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        id="google-place-autocomplete-script"
      />
      <input
        type="text"
        ref={ref}
        id="userAddressLocation"
        className="border-2"
      />
    </div>
  )
}
