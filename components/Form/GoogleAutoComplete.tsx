/* eslint-disable react/no-array-index-key */
import Script from 'next/script'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import PlaceAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

export default function GoogleAutoComplete() {
  const [address, setAddress] = useState('')
  const {
    formState: { errors },
    control,
  } = useFormContext()

  const country = useWatch({
    control,
    name: 'country',
  })

  function handleChange(userAddress: string) {
    setAddress(userAddress)
  }

  function handleSelect(userInputAddress: string) {
    const userLocation = `${userInputAddress} ${country}`
    geocodeByAddress(userLocation)
  }
  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />
      <PlaceAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }: any) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Address',
                name: 'address',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <p>Loading...</p>}
              {suggestions.map((suggestion: any, index: number) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={`${suggestion.description}-${index}`}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlaceAutocomplete>
      <p className="text-red-500">{errors?.address?.message}</p>
    </div>
  )
}
