/* eslint-disable no-param-reassign */

export function splitProductCategories(productCategories: string) {
  if (productCategories?.includes(',')) {
    return productCategories.split(',')
  }
  return productCategories
}

function displayHierarchicalCategory(
  value: number,
  productCategories: string[]
) {
  switch (value) {
    case 1:
      return productCategories[0]
    case 2:
      return `${productCategories[0]} > ${productCategories[1]}`
    case 3:
      return `${productCategories[0]} > ${productCategories[1]} > ${productCategories[2]}`
    case 4:
      return `${productCategories[0]} > ${productCategories[1]} > ${productCategories[2]} > ${productCategories[3]}`
    case 5:
      return `${productCategories[0]} > ${productCategories[1]} > ${productCategories[2]} > ${productCategories[3]} > ${productCategories[4]}`
    default:
      return null
  }
}

function mapHierarchicalCategory(
  array: number[],
  productCategory: any,
  hierarchicalCategoryObj: any
) {
  return array.map((value) => {
    const count = value + 1
    hierarchicalCategoryObj[`hierarchical_categories.lvl${value}`] =
      displayHierarchicalCategory(count, productCategory)
    return hierarchicalCategoryObj
  })
}

export function hierarchicalCategory(productCategory: string[]) {
  let productCategories: any = []
  if (productCategory.length === 1) {
    productCategories = [productCategory]
  } else if (productCategory.length === 2) {
    const productCategory2: any = splitProductCategories(productCategory[1])
    if (typeof productCategory2 === 'object') {
      productCategories = [productCategory[0], ...productCategory2]
    } else if (typeof productCategory2 === 'string') {
      productCategories = [productCategory[0], productCategory2]
    }
  }

  const hierarchicalCategoryObj: any = {}

  if (productCategories.length === 1) {
    mapHierarchicalCategory([0], productCategories, hierarchicalCategoryObj)
  } else if (productCategories.length === 2) {
    mapHierarchicalCategory([0, 1], productCategories, hierarchicalCategoryObj)
  } else if (productCategories.length === 3) {
    mapHierarchicalCategory(
      [0, 1, 2],
      productCategories,
      hierarchicalCategoryObj
    )
  } else if (productCategories.length === 4) {
    mapHierarchicalCategory(
      [0, 1, 2, 3],
      productCategories,
      hierarchicalCategoryObj
    )
  } else if (productCategories.length === 5) {
    mapHierarchicalCategory(
      [0, 1, 2, 3, 4],
      productCategories,
      hierarchicalCategoryObj
    )
  }
  return hierarchicalCategoryObj
}
