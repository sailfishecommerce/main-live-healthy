import { HexColorPicker } from 'react-colorful'

import ColorBox from '@/components/Settings/ColorBox'
import useColorPicker from '@/hooks/useColorPicker'

export default function ChangeSiteColorCode() {
  const { pickColorHandler, changeColorHandler, boxColor, colorPicker } =
    useColorPicker()

  return (
    <div className="site-color-code">
      <h3 className="text-center font-semibold text-xl mb-6">
        Click on the Box to edit the Color
      </h3>
      <div className="button-group">
        <button type="button" className="reset">
          Reset to default
        </button>
        <button type="button" className="saveChanges">
          Save Changes
        </button>
      </div>
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
