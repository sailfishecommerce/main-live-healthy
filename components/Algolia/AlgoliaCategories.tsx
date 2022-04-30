/* eslint-disable array-callback-return */
import algoliasearch from 'algoliasearch'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { InstantSearch, connectRefinementList } from 'react-instantsearch-dom'

import { useAppSelector } from '@/hooks/useRedux'

function getCategorySubMenu(items: any[]) {
  const itemLabelArray = items.map((item: { label: string }) => item.label)
  const uniqueItemLabel = new Set(itemLabelArray)
  const uniqueItemLabelArray = Array.from(uniqueItemLabel)
  return uniqueItemLabelArray
}

function getMenusInACategory(category: string, categories: string[]) {
  let menuArray: string[] = []
  categories.map((categoryItem: string) => {
    if (categoryItem.includes(category)) {
      menuArray = [...menuArray, categoryItem]
    }
  })
  return menuArray
}

function splitCategory(category: string[]) {
  let categoryArray: string[] = []
  category.map((item) => {
    const splittedWords = item.split(' > ')
    categoryArray = [...categoryArray, splittedWords[1]]
  })
  return categoryArray
}

function getCategoryMenus(category: string, items: []) {
  const categorySubMenuArray = getCategorySubMenu(items)
  const beautyMenuArray = getMenusInACategory(category, categorySubMenuArray)
  const formattedBeautyArray = splitCategory(beautyMenuArray)
  return formattedBeautyArray
}

function RefinementListMenu({ items, selectedCategory }: any) {
  const menuArray = getCategoryMenus(selectedCategory, items)
  return (
    <div className="menu">
      <h1 className="text-lg mb-4 font-medium">{selectedCategory}</h1>
      <ul className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-2">
        {menuArray.map((item) => (
          <li className="hover:text-green-500 my-1" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="bg-mountain-green mt-8 rounded-lg p-2 text-white"
      >
        Show all {selectedCategory}
      </button>
      <style jsx>
        {`
          @media (min-width: 768px) {
            .menu ul {
              max-height: 150px;
              overflow-y: scroll;
            }
          }
          @media (max-width: 768px) {
            .menu {
              height: 100vh;
            }
            .menu ul {
              max-height: 66%;
              overflow-y: scroll;
            }
          }
        `}
      </style>
    </div>
  )
}

const searchClient = algoliasearch(
  `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
  `${process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY}`
)

const CustomRefinementListMenu = connectRefinementList<any>(
  memo(RefinementListMenu, isEqual)
)

export default function AlgoliaCategories() {
  const { selectedCategory } = useAppSelector((state) => state.UI)
  return (
    <InstantSearch
      indexName="New_Livehealthy_products_index"
      searchClient={searchClient}
    >
      <CustomRefinementListMenu
        attribute="hierarchical_categories.lvl1"
        limit={100}
        selectedCategory={selectedCategory}
      />
    </InstantSearch>
  )
}
