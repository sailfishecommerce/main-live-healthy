/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import algoliasearch from 'algoliasearch'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { InstantSearch, connectRefinementList } from 'react-instantsearch-dom'

import { LineLoaderArray } from '@/components/Loader/ProductsLoader'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import { selectedCategoryAtom, categoryDropdownAtom } from '@/lib/atomConfig'
import { getCategoryMenus, getCategorySlug } from '@/lib/formatCategories'

function RefinementListMenu({ items, selectedCategory }: any) {
  const menuArray = getCategoryMenus(selectedCategory, items)

  const [, setCategoryDropdown] = useAtom(categoryDropdownAtom)
  const { toggleMobileMenu } = useNav()
  const mobileWidth = useMediaQuery('(max-width:768px)')

  function toggleCategoryDropdownHandler() {
    if (mobileWidth) {
      toggleMobileMenu()
    } else if (!mobileWidth) {
      setCategoryDropdown((prev) => !prev)
    }
  }

  return (
    <div className="menu">
      <h1 className="text-lg mb-4 font-medium mb-6">{selectedCategory}</h1>

      <ul className="flex flex-col pl-0 lg:grid lg:grid-cols-3 lg:gap-2">
        {menuArray.length === 0 && <LineLoaderArray numberOfLine={10} />}
        {menuArray.length > 0 &&
          menuArray.map((item, index: number) => {
            return (
              <li
                className="hover:text-green-500 my-1"
                key={`${item}-${index}`}
              >
                {item !== undefined && (
                  <Link
                    passHref
                    href={`/collection/${getCategorySlug(
                      selectedCategory
                    )}/${getCategorySlug(item)}`}
                  >
                    <a title={item} onClick={toggleCategoryDropdownHandler}>
                      {item}
                    </a>
                  </Link>
                )}
              </li>
            )
          })}
      </ul>

      {selectedCategory && menuArray.length > 0 && (
        <Link
          passHref
          href={`/collection/${getCategorySlug(selectedCategory)}`}
        >
          <button
            type="button"
            aria-label="show all categories"
            className="bg-mountain-green mt-8 rounded-lg p-2 text-white"
            onClick={toggleCategoryDropdownHandler}
          >
            Show all {selectedCategory}
          </button>
        </Link>
      )}
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
              max-height: calc(75% - 50px);
              overflow-y: scroll;
              margin-top: -15px;
            }
            .bg-mountain-green {
              width: 100%;
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
  const [selectedCategory] = useAtom(selectedCategoryAtom)

  return (
    <InstantSearch
      indexName="LIVEHEALTHY_PRODUCTION_INDEX"
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
