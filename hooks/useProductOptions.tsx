/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { useState } from 'react'

import { updateProductOption } from '@/redux/product-slice'

import { useAppDispatch } from './useRedux'

export default function useProductOptions() {
  const [selectedOptions, setSelectedOptions] = useState<any>([])
  const dispatch = useAppDispatch()

  function optionHandler(e: any) {
    const optionValue = { name: e.target.name, value: e.target.value }
    const existingOptionIndex = selectedOptions.findIndex(
      (option: { name: any }) => option.name === e.target.name
    )
    console.log('optionValue', optionValue)
    if (existingOptionIndex !== -1) {
      let copiedOptions = selectedOptions
      copiedOptions[existingOptionIndex] = optionValue

      dispatch(updateProductOption([...copiedOptions]))

      setSelectedOptions([...copiedOptions])
    } else {
      setSelectedOptions([...selectedOptions, optionValue])
      dispatch(updateProductOption([...selectedOptions, optionValue]))
    }
  }

  function selectedItemHandler(e: any) {
    const optionValue = { name: e.target.name, value: e.target.value }
    const existingOptionIndex = selectedOptions.findIndex(
      (option: { name: any }) => option.name === e.target.name
    )
    console.log('optionValue', optionValue)
    if (existingOptionIndex !== -1) {
      let copiedOptions = selectedOptions
      copiedOptions[existingOptionIndex] = optionValue
      setSelectedOptions([...copiedOptions])
    } else {
      setSelectedOptions([...selectedOptions, optionValue])
    }
  }

  return {
    optionHandler,
    selectedItemHandler,
    selectedOptions,
  }
}
