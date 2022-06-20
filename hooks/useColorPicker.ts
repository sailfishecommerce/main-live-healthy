/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import type { colorItemType } from '@/components/Settings/ColorBox'
import colorCodes from '@/json/color-codes.json'
import { boxColorAtom, saveDefaultColorsToDbAtom } from '@/lib/atomConfig'
import firebaseDatabase from '@/lib/firebaseDatabase'

type stateType = colorItemType & {
  index: number
}

export default function useColorPicker() {
  const [boxColor, setBoxColor] = useAtom(boxColorAtom)
  const [saveDefaultColorsToDb, setSaveDefaultColorsToDb] = useAtom(
    saveDefaultColorsToDbAtom
  )
  const [colorPicker, setColorPicker] = useState<stateType>({
    colorKey: '',
    colorCode: '',
    index: 0,
    colorName: '',
  })

  useEffect(() => {
    if (!saveDefaultColorsToDb) {
      saveDefaultCodeToDBOnce().then(() => {
        setSaveDefaultColorsToDb(true)
      })
    }
  }, [])

  function saveDefaultCodeToDBOnce() {
    const { writeData } = firebaseDatabase()
    return writeData('color-codes', JSON.stringify(boxColor))
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
    return boxColor.map((bColor) => {
      if (bColor.colorKey === colorPicker.colorKey) {
        bColor.colorCode = color
        bColor.colorName = color
      }
      return bColor
    })
  }

  function changeColorHandler(colorCode: string) {
    const updatedColor = changeColor(colorCode)
    setBoxColor(updatedColor)
  }

  function resetColor() {
    return setBoxColor(colorCodes)
  }

  return {
    pickColorHandler,
    boxColor,
    changeColorHandler,
    colorPicker,
    resetColor,
  }
}
