/* eslint-disable react/jsx-handler-names */
import { HexColorPicker } from 'react-colorful'

import ColorBox from '@/components/Settings/ColorBox'
import useColorPicker from '@/hooks/useColorPicker'

export default function ChangeSiteColorCode() {
  const {
    pickColorHandler,
    resetColor,
    changeColorHandler,
    siteColors,
    colorPicker,
    saveColorChangesToDB,
  } = useColorPicker()

  const buttonGroup = [
    {
      text: 'Reset to default',
      id: 1,
      className: 'reset',
      methodHandler: resetColor,
    },
    {
      text: 'Save Changes',
      id: 2,
      className: 'saveChanges',
      methodHandler: () =>
        saveColorChangesToDB(siteColors, 'color changes successful'),
    },
  ]

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
            onClick={buttonItem.methodHandler}
          >
            {buttonItem.text}
          </button>
        ))}
      </div>
      <div className="site-color-view">
        <ul className="color-view">
          {siteColors.length > 0 &&
            siteColors.map((colorItem, index: number) => (
              <ColorBox
                colorItem={colorItem}
                key={colorItem.colorKey}
                index={index}
                onClickHandler={pickColorHandler}
              />
            ))}
        </ul>
        <div className="color-picker">
          {siteColors.length > 0 && colorPicker.colorCode && (
            <HexColorPicker
              color={colorPicker.colorCode}
              onChange={changeColorHandler}
            />
          )}
          <span className="font-light text-lg mt-2">
            {colorPicker.colorCode && siteColors[colorPicker.index].colorCode}
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
          color: var(--color-13);
          border-radius: 5px;
        }
        .reset {
          background-color: var(--color-12);
          border: 1px solid var(--color-12);
        }
        button.reset:hover {
          border: 1px solid var(--color-12);
          background-color: transparent;
          color: var(--color-12);
        }
        .saveChanges {
          background-color: var(--color-1);
          border: 1px solid var(--color-1);
        }
        button.saveChanges:hover {
          border: 1px solid var(--color-1);
          background-color: transparent;
          color: var(--color-1);
        }
      `}</style>
    </div>
  )
}
