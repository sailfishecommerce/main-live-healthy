const colorCodes = [
  { colorText: 'mountain-green', colorCode: '#95bf11' },
  { colorText: 'mountain-mist', colorCode: '#678800' },
  { colorText: 'tan-hide', colorCode: '#faa916' },
  { colorText: 'tan-light-hide', colorCode: '#ffe690' },
  { colorText: 'tan-deep-hide', colorCode: '#ed9b09' },
  { colorText: 'gray-manatee', colorCode: '#9e9aa6' },
  { colorText: 'gray-lavender', colorCode: '#c3c0c8' },
  { colorText: 'gray-platinum', colorCode: '#e7e6e9' },
  { colorText: 'light-gray', colorCode: '#f7f8fa' },
  { colorText: 'light-red', colorCode: '#fd121240' },
  { colorText: 'light-green', colorCode: '#16a26740' },
]

interface ColorBoxProps {
  colorItem: {
    colorText: string
    colorCode: string
  }
}

function ColorBox({ colorItem }: ColorBoxProps) {
  return (
    <>
      <li className="my-4 flex items-center justify-between color-list">
        <h6 className="font-light text-lg">
          {colorItem.colorText.toUpperCase()}
        </h6>
        <span className="colorBox" />
      </li>
      <style jsx>
        {`
          .colorBox {
            background-color: ${colorItem.colorCode};
            height: 50px;
            width: 50px;
            display: flex;
          }
          .color-list {
            width: 60%;
          }
        `}
      </style>
    </>
  )
}

export default function ChangeSiteColorCode() {
  return (
    <div>
      <ul>
        {colorCodes.map((colorItem) => (
          <ColorBox colorItem={colorItem} key={colorItem.colorCode} />
        ))}
      </ul>
    </div>
  )
}
