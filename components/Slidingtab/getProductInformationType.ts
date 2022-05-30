type productTabHeadType =
  | 'Directions'
  | 'Product Information'
  | 'STORAGE INSTRUCTIONS'
  | 'Storage Instructions'

function infoType(
  information: string,
  type: productTabHeadType,
  index: number
) {
  let productInfoType = ''
  if (information.includes(type)) {
    const info = information.split(type)[index]
    productInfoType = info
  }
  return productInfoType
}

function productInformation(information: string) {
  const stageOne = infoType(information, 'STORAGE INSTRUCTIONS', 0)
  const productInfo =
    infoType(stageOne, 'Directions', 0) ||
    infoType(information, 'Directions', 0) ||
    information
  return productInfo
}
export default function getProductInformationType(
  informationTab: string,
  information: string
): string {
  let result
  switch (informationTab) {
    case 'Product Information': {
      result = productInformation(information)
      return result
    }
    case 'Directions': {
      const resultStage1 = infoType(information, 'Directions', 1)
      result = infoType(resultStage1, 'STORAGE INSTRUCTIONS', 0)
      return result
    }
    case 'STORAGE INSTUCTIONS': {
      result = infoType(information, 'STORAGE INSTRUCTIONS', 1)
      return result
    }
    default:
      return ''
  }
}
