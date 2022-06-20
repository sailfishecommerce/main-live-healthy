/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { useState } from 'react'

import type { colorItemType } from '@/components/Settings/ColorBox'
import { boxColorAtom } from '@/lib/atomConfig'

type stateType = colorItemType & {
  index: number | null
}

export default function useColorPicker() {
  const [boxColor, setBoxColor] = useAtom(boxColorAtom)
  const [colorPicker, setColorPicker] = useState<stateType>({
    colorKey: '',
    colorCode: '',
    index: null,
    colorName: '',
  })

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

  return {
    pickColorHandler,
    boxColor,
    changeColorHandler,
    colorPicker,
  }
}
