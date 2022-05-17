/* eslint-disable array-callback-return */
export function getCategorySubMenu(items: any[]) {
  const itemLabelArray = items.map((item: { label: string }) => item.label)
  const uniqueItemLabel = new Set(itemLabelArray)
  const uniqueItemLabelArray = Array.from(uniqueItemLabel)
  return uniqueItemLabelArray
}

export function getMenusInACategory(category: string, categories: string[]) {
  let menuArray: string[] = []
  categories.map((categoryItem: string) => {
    if (categoryItem.includes(category)) {
      menuArray = [...menuArray, categoryItem]
    }
  })
  return menuArray
}

export function splitCategory(category: string[]) {
  let categoryArray: string[] = []
  category.map((item) => {
    const splittedWords = item.split(' > ')
    categoryArray = [...categoryArray, splittedWords[1]]
  })
  return categoryArray
}

export function getCategoryMenus(category: string, items: []) {
  const categorySubMenuArray = getCategorySubMenu(items)
  const beautyMenuArray = getMenusInACategory(category, categorySubMenuArray)
  const formattedBeautyArray = splitCategory(beautyMenuArray)
  return formattedBeautyArray
}

export function getCategorySlug(category: string) {
  const categorySlug = category
    .replaceAll('-', '%2B')
    .replaceAll(' ', '-')
    .replaceAll('&', '%26')
  return categorySlug
}
