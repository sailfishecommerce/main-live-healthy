import { useAtom } from 'jotai'
import { HiMenuAlt4 } from 'react-icons/hi'

import { categoryDropdownAtom } from '@/lib/atomConfig'

export default function AllCategoriesDropdown() {
  const [, setCategoryDropdown] = useAtom(categoryDropdownAtom)

  function toggleCategoryDropdownHandler() {
    return setCategoryDropdown((prev) => !prev)
  }
  return (
    <button
      className="bg-mountain-green relative flex items-center font-bold hover:bg-green-500 text-white rounded-md px-2 py-1"
      type="button"
      onClick={toggleCategoryDropdownHandler}
    >
      <HiMenuAlt4 className="mr-2" /> Categories
    </button>
  )
}
