/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import type { colorItemType } from '@/components/Settings/ColorBox'
import ColorBox from '@/components/Settings/ColorBox'
import colorCodes from '@/json/color-codes.json'
import { boxColorAtom } from '@/lib/atomConfig'

export default function ChangeSiteColorCode() {
  const [boxColor, setBoxColor] = useAtom(boxColorAtom)
  const [colorPicker, setColorPicker] = useState<colorItemType>({
    colorKey: '',
    colorCode: '',
    colorName: '',
  })

  console.log('colorPicker', colorPicker)
  console.log('boxColor', boxColor)

  function pickColorHandler(colorItem: colorItemType) {
    setColorPicker({
      ...colorPicker,
      colorKey: colorItem.colorKey,
      colorName: colorItem.colorName,
      colorCode: colorItem.colorCode,
    })
  }

  function changeColor(color: string): any {
    const colorArray = boxColor.map((bColor) => {
      if (bColor.colorKey === colorPicker.colorKey) {
        bColor.colorCode = color
      }
    })
    console.log('colorArray', colorArray)
    return colorArray
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
            boxColor.map((colorItem) => (
              <ColorBox
                colorItem={colorItem}
                key={colorItem.colorKey}
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
            {colorPicker.colorName.toUpperCase()}
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
