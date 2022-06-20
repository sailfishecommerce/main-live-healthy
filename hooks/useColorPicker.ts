/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'

import type { colorItemType } from '@/components/Settings/ColorBox'
import useToast from '@/hooks/useToast'
import colorCodes from '@/json/color-codes.json'
import { siteColorsAtom } from '@/lib/atomConfig'
import firebaseDatabase from '@/lib/firebaseDatabase'

type stateType = colorItemType & {
  index: number
}

export default function useColorPicker() {
  const [siteColors, setSiteColors] = useAtom(siteColorsAtom)
  const [colorPicker, setColorPicker] = useState<stateType>({
    colorKey: '',
    colorCode: '',
    index: 0,
    colorName: '',
  })
  const { loadingToast, updateToast } = useToast()
  const toastRef = useRef(null)

  // save default colors to db
  useEffect(() => {
    if (siteColors.length === 0) {
      saveDefaultCodeToDBOnce()
      siteColorsFromDB()
    } else {
      siteColorsFromDB()
    }
  }, [])

  function saveDefaultCodeToDBOnce() {
    const { writeData } = firebaseDatabase()
    return writeData('color-codes', JSON.stringify(colorCodes))
  }

  function saveColorChangesToDB(
    boxColorData: colorItemType[],
    message: string
  ) {
    const { writeData } = firebaseDatabase()
    loadingToast(toastRef)
    return writeData('color-codes', JSON.stringify(boxColorData))
      .then(() => {
        return updateToast(toastRef, 'success', message)
      })
      .catch(() =>
        updateToast(
          toastRef,
          'error',
          'an error occured, unable to save color changes'
        )
      )
  }

  function siteColorsFromDB() {
    const { readData } = firebaseDatabase()
    return readData('color-codes', setSiteColors)
  }

  function pickColorHandler(colorItem: colorItemType, index: number) {
    setColorPicker({
      colorKey: colorItem.colorKey,
      colorName: colorItem.colorName,
      colorCode: colorItem.colorCode,
      index,
    })
  }

  function changeColor(color: string): any {
    return siteColors.map((bColor) => {
      if (bColor.colorKey === colorPicker.colorKey) {
        bColor.colorCode = color
        bColor.colorName = color
      }
      return bColor
    })
  }

  function changeColorHandler(colorCode: string) {
    const updatedColor = changeColor(colorCode)
    setSiteColors(updatedColor)
  }

  function resetColor() {
    setSiteColors(colorCodes)
    saveColorChangesToDB(colorCodes, 'reset colors successful')
  }

  return {
    pickColorHandler,
    siteColors,
    changeColorHandler,
    colorPicker,
    saveColorChangesToDB,
    resetColor,
    siteColorsFromDB,
  }
}
