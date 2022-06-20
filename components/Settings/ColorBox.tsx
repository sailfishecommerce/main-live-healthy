interface ColorBoxProps {
  colorItem: {
    colorText: string
    colorCode: string
    colorKey: string
  }
  onClickHandler: (
    colorItem: {
      colorText: string
      colorKey: string
    },
    index: number
  ) => void
  index: number
}

export default function ColorBox({
  colorItem,
  onClickHandler,
  index,
}: ColorBoxProps) {
  const { colorCode, colorText } = colorItem

  return (
    <>
      <li className="my-4 flex items-center justify-between color-list relative">
        <div className="color-group">
          <h6 className="font-light text-lg">{colorText.toUpperCase()}</h6>
          <button
            type="button"
            className="colorBox"
            onClick={() => onClickHandler(colorItem, index)}
          />
        </div>
      </li>
      <style jsx>
        {`
          .colorBox {
            background-color: ${colorCode};
            height: 30px;
            width: 30px;
            display: flex;
          }

          .color-group {
            display: flex;
            width: 100%;
            justify-content: space-between;
          }
          .picker {
            position: absolute;
            right: 0px;
          }
        `}
      </style>
    </>
  )
}
