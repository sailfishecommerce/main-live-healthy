/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import algoliasearch from 'algoliasearch'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { InstantSearch, connectRefinementList } from 'react-instantsearch-dom'

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
      <Link passHref href={`/collection/${getCategorySlug(selectedCategory)}`}>
        <a
          className="hover:text-red-500"
          onClick={toggleCategoryDropdownHandler}
        >
          <h1 className="text-lg mb-4 font-medium">{selectedCategory}</h1>
        </a>
      </Link>
      <ul className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-2">
        {menuArray.map((item) => {
          return (
            <li className="hover:text-green-500 my-1" key={item}>
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
            </li>
          )
        })}
      </ul>
      <Link passHref href={`/collection/${getCategorySlug(selectedCategory)}`}>
        <button
          type="button"
          aria-label="show all categories"
          className="bg-mountain-green mt-8 rounded-lg p-2 text-white"
          onClick={toggleCategoryDropdownHandler}
        >
          Show all {selectedCategory}
        </button>
      </Link>
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
              max-height: calc(60% - 50px);
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
