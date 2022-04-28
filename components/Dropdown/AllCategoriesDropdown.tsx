import { HiMenuAlt4 } from 'react-icons/hi'

import useUI from '@/hooks/useUI'

export default function AllCategoriesDropdown() {
  const { toggleCategoriesDropdown } = useUI()

  return (
    <button
      className="bg-mountain-green relative flex items-center font-bold hover:bg-green-500 text-white rounded-md px-2 py-1"
      type="button"
      onClick={toggleCategoriesDropdown}
    >
      <HiMenuAlt4 className="mr-2" /> Categories
    </button>
  )
}
