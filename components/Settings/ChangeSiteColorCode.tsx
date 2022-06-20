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
  { colorText: 'light-red', colorCode: '#f7f8fa' },
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
      <li>
        <span className="colorBox" />
        {colorItem.colorText}
      </li>
      <style jsx>
        {`
          .colorBox {
            background-color: ${colorItem.colorCode};
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
