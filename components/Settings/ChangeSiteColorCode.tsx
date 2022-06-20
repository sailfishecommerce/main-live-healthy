/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import type { colorItemType } from '@/components/Settings/ColorBox'
import ColorBox from '@/components/Settings/ColorBox'
import colorCodes from '@/json/color-codes.json'
import { boxColorAtom } from '@/lib/atomConfig'

type stateType = colorItemType & {
  index: number | null
}

export default function ChangeSiteColorCode() {
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

  useEffect(() => setBoxColor(colorCodes), [])

  function changeColorHandler(colorCode: string) {
    const updatedColor = changeColor(colorCode)
    setBoxColor(updatedColor)
  }
  return (
    <div>
      <h3 className="text-center font-semibold text-xl mb-6">
        Click on the Box to edit the Color
      </h3>
      <div className="site-color-view">
        <ul className="color-view">
          {boxColor.length > 0 &&
            boxColor.map((colorItem, index: number) => (
              <ColorBox
                colorItem={colorItem}
                key={colorItem.colorKey}
                index={index}
                onClickHandler={pickColorHandler}
              />
            ))}
        </ul>
        <div className="color-picker">
          {boxColor.length > 0 && colorPicker.colorCode && (
            <HexColorPicker
              color={colorPicker.colorCode}
              onChange={changeColorHandler}
            />
          )}
          <span className="font-light text-lg mt-2">
            {colorPicker.index && boxColor[colorPicker.index].colorCode}
          </span>
        </div>
      </div>
      <style jsx>{`
        .site-color-view {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .color-view {
          width: 60%;
        }
        .color-picker {
          width: 30%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
        }
      `}</style>
    </div>
  )
}
