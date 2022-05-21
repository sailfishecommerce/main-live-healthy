/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai'

import { useMediaQuery } from '@/hooks'
import useCategoryData from '@/hooks/useCategoryData'
// import allCategoryContent from '@/json/allcategories-dropdown.json'
import { mobileSlideMenuViewAtom, selectedCategoryAtom } from '@/lib/atomConfig'

type categoryType = {
  slug: string
  name: string
}

interface CategoryProps {
  categories: categoryType[]
  title: string
  className?: string
}

function CategoryLinks({ categories, title, className }: CategoryProps) {
  const categoryLinkClassName = className ? className : ''
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)
  const [, setMobileSlideMenuView] = useAtom(mobileSlideMenuViewAtom)

  const mobileWidth = useMediaQuery('(max-width:768px)')

  const selectCategoryHandler = (category: string) => {
    if (mobileWidth) {
      setMobileSlideMenuView('SUBMENU')
    }
    if (title === 'Categories') {
      setSelectedCategory(category)
    }
  }

  return (
    <>
      <h1 className="lg:text-2xl text-lg font-medium mb-1">{title}</h1>
      <ul
        className={`${categoryLinkClassName} lg:border-gray-200 pb-2 category-list lg:border-r lg:mr-8 w-full`}
      >
        {categories?.map((category: categoryType) => {
          const activeCategory =
            category.name === selectedCategory ? 'active' : ''
          return (
            <li
              key={category.name}
              className={`${activeCategory} cursor-pointer sidebar-list px-2 py-1 lg:my-1 my-0 w-full`}
              onClick={() => selectCategoryHandler(category.name)}
            >
              {category.name}
            </li>
          )
        })}
      </ul>
      <style jsx>
        {`
          .category-list {
            overflow-y: scroll;
            height: 100%;
          }
          .sidebar-list.active {
            font-weight: bold;
          }
          .sidebar-list:hover,
          .sidebar-list.active {
            background-color: #ffe690;
          }
          .sidebar-list:hover a {
            font-weight: 600;
          }
        `}
      </style>
    </>
  )
}

export default function CategorySidebarList() {
  const [data, status] = useCategoryData()

  const categories = status === 'success' ? data?.results.slice(12, 20) : []
  return (
    <>
      <div className="category-sidebar flex flex-col lg:w-1/5 w-full pr-4">
        <CategoryLinks
          className="lg:border-b"
          categories={categories}
          title="Categories"
        />
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .category-sidebar {
              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  )
}
