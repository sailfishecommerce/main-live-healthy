import useCategoryData from '@/hooks/useCategoryData'
import { useAppSelector } from '@/hooks/useRedux'
import allCategoryContent from '@/json/allcategories-dropdown.json'
import { useAppDispatch } from '@/redux/store'
import { updatedSelectedCategory } from '@/redux/ui-slice'

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

  const selectCategoryHandler = (category: string) => {
    if (title === 'Categories') {
      dispatch(updatedSelectedCategory(category))
    }
  }

  return (
    <>
      <h1 className="text-2xl font-medium my-2">{title}</h1>
      <ul
        className={`${categoryLinkClassName} border-gray-200 pb-2 category-list border-r mr-8 w-full`}
      >
        {categories?.map((category: categoryType, index: number) => {
          const activeCategory =
            category.name === selectedCategory ? 'active' : ''
          return (
            <li
              key={index}
              className={`${activeCategory} sidebar-list px-2 py-1 my-1 w-full`}
            >
              <button
                type="button"
                className="text-black"
                onClick={() => selectCategoryHandler(category.name)}
              >
                {category.name}
              </button>
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
          .sidebar-list.active button {
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
    <div className="category-sidebar flex flex-col w-1/5">
      <CategoryLinks
        className="border-b"
        categories={categories}
        title="Categories"
      />
      <CategoryLinks categories={allCategoryContent.sidebar} title="Section" />
    </div>
  )
}
