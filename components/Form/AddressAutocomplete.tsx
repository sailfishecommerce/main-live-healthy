/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import useAutocomplete from '@/hooks/useAutocomplete'

declare global {
  interface Window {
    google: any
  }
}

export default function AddressAutoComplete() {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext()
  const autoCompleteRef = useRef(null)
  const [address, setAddress] = useState('')
  const { loadScript, handleScriptLoad } = useAutocomplete()

  const country = useWatch({
    control,
    name: 'country',
  })

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setValue, autoCompleteRef, country, setAddress)
    )
  }, [])

  function onChangeHandler(e: any) {
    return setAddress(e.target.value)
  }

  return (
    <div className="mb-1 flex flex-col px-2 w-full">
      <input
        placeholder="Address"
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
        ref={autoCompleteRef}
        name="address"
        value={address}
        onChange={onChangeHandler}
      />
      <p className="text-red-500">{errors?.address?.message}</p>
    </div>
  )
}
