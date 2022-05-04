/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useMediaQuery } from '@/hooks'
import useCategoryData from '@/hooks/useCategoryData'
import { useAppSelector } from '@/hooks/useRedux'
import allCategoryContent from '@/json/allcategories-dropdown.json'
import { useAppDispatch } from '@/redux/store'
import {
  updatedSelectedCategory,
  updateMobileSlideMenuView,
} from '@/redux/ui-slice'

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
  const dispatch = useAppDispatch()
  const { selectedCategory } = useAppSelector((state) => state.UI)
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const selectCategoryHandler = (category: string) => {
    if (mobileWidth) {
      dispatch(updateMobileSlideMenuView('SUBMENU'))
    }
    if (title === 'Categories') {
      dispatch(updatedSelectedCategory(category))
    }
  }

  return (
    <>
      <h1 className="lg:text-2xl text-lg font-medium my-2">{title}</h1>
      <ul
        className={`${categoryLinkClassName} border-gray-200 pb-2 category-list border-r mr-8 w-full`}
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
            max-height: 200px;
            overflow-y: scroll;
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
      <div className="category-sidebar flex flex-col lg:w-1/5 w-3/4">
        <CategoryLinks
          className="border-b"
          categories={categories}
          title="Categories"
        />
        <CategoryLinks
          categories={allCategoryContent.sidebar}
          title="Section"
        />
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .category-sidebar {
              max-height: 38%;
              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  )
}
