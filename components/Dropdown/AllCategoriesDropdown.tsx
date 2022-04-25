import { HiMenuAlt4 } from 'react-icons/hi'

import useUI from '@/hooks/useUI'

export default function AllCategoriesDropdown() {
  const { toggleCategoriesDropdown }: any = useUI()

  return (
    <>
      <button
        className="allCategories relative flex items-center font-bold hover:bg-green-500 text-white rounded-md px-2 py-1"
        type="button"
        onClick={toggleCategoriesDropdown}
      >
        <HiMenuAlt4 className="mr-2" /> Categories
      </button>
      <style jsx>
        {`
          .allCategories {
            background-color: var(--mountain-green);
          }
          .allCategories:hover {
            background-color: var(--mountain-mist);
          }
        `}
      </style>
    </>
  )
}
