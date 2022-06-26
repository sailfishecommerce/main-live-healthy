import { useAtom } from 'jotai'
import { HiMenuAlt4 } from 'react-icons/hi'

import { useMediaQuery } from '@/hooks'
import { categoryDropdownAtom } from '@/lib/atomConfig'

export default function AllCategoriesDropdown() {
  const [, setCategoryDropdown] = useAtom(categoryDropdownAtom)
  const mediaQuery = useMediaQuery('(max-width:1024px) and (min-width:768px)')

  const categoryText = mediaQuery ? '' : 'Categories'
  const categoryClassName = mediaQuery ? '' : 'mr-2'

  function toggleCategoryDropdownHandler() {
    return setCategoryDropdown((prev) => !prev)
  }
  return (
    <button
      className="bg-mountain-green justify-center lg:mr-3 relative flex items-center font-bold hover:bg-green-500 text-white rounded-md px-2 py-1"
      type="button"
      aria-label="Catgories"
      onClick={toggleCategoryDropdownHandler}
    >
      <HiMenuAlt4 className={categoryClassName} /> {categoryText}
    </button>
  )
}
