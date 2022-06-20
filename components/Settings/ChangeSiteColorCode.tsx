import { HexColorPicker } from 'react-colorful'

import ColorBox from '@/components/Settings/ColorBox'
import useColorPicker from '@/hooks/useColorPicker'

const buttonGroup = [
  { text: 'Reset to default', id: 1, className: 'reset' },
  { text: 'Save Changes', id: 2, className: 'saveChanges' },
]

export default function ChangeSiteColorCode() {
  const { pickColorHandler, changeColorHandler, boxColor, colorPicker } =
    useColorPicker()

  return (
    <div className="site-color-code">
      <h3 className="text-center font-semibold text-xl mb-6">
        Click on the Box to edit the Color
      </h3>
      <div className="button-group mb-6">
        {buttonGroup.map((buttonItem) => (
          <button
            key={buttonItem.id}
            type="button"
            className={buttonItem.className}
          >
            {buttonItem.text}
          </button>
        ))}
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
        .button-group {
          display: flex;
          align-items: center;
          justify-content: end;
        }
        .button-group button {
          padding: 5px;
          margin: 0px 20px;
          color: var(--white);
          border-radius: 5px;
        }
        .reset {
          background-color: var(--pale-red);
          border: 1px solid var(--pale-red);
        }
        button.reset:hover {
          border: 1px solid var(--pale-red);
          background-color: transparent;
          color: var(--pale-red);
        }
        .saveChanges {
          background-color: var(--mountain-green);
          border: 1px solid var(--mountain-green);
        }
        button.saveChanges:hover {
          border: 1px solid var(--mountain-green);
          background-color: transparent;
          color: var(--mountain-green);
        }
      `}</style>
    </div>
  )
}
