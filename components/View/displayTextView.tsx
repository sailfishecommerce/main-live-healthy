type formatStylesType = Array<{
  style: string
}>

type contentType = {
  type: string
  text: string
  inlineStyleRanges: formatStylesType
}
function formatStyles(textStyles: formatStylesType): any {
  const styles: any = {}
  textStyles.map((textStyle) => {
    const styleGroup = textStyle.style.split('-')
    const stylekey = styleGroup[0]
    const styleValue = styleGroup[1]

    switch (stylekey) {
      case 'fontsize': {
        styles.fontSize = styleValue
        return styles
      }
      case 'color': {
        styles.color = styleValue
        return styles
      }
      case 'fontfamily': {
        styles.fontFamily = styleValue
        return styles
      }
      default:
        return { styles }
    }
  })

  return styles
}

export default function displayTextView(content: contentType) {
  switch (content.type) {
    case 'header-one':
      return (
        <h1
          className="text-xl lg:text-3xl lg:my-2 lg:mb-4 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h1>
      )
    case 'header-two':
      return (
        <h2
          className="text-xl lg:text-2xl  lg:my-2 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h2>
      )
    case 'header-three':
      return (
        <h3
          className="text-xl lg:text-xl lg:my-2 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h3>
      )
    case 'header-four':
      return (
        <h4
          className="text-xl lg:text-lg lg:my-2 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h4>
      )
    case 'header-five':
      return (
        <h5
          className="text-xl lg:text-md lg:my-2 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h5>
      )
    case 'header-six':
      return (
        <h6
          className="text-xl lg:text-sm lg:my-2 font-semibold"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </h6>
      )
    default:
      return (
        <p
          className="text-md my-2 font-light"
          style={formatStyles(content.inlineStyleRanges)}
        >
          {content.text}
        </p>
      )
  }
}
