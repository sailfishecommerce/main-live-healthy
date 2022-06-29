/* eslint-disable jsx-a11y/no-static-element-interactions */
import CategoryMainList from '@/components/Dropdown/CategoryMainList'
import CategorySidebarList from '@/components/Dropdown/CategorySidebarList'

interface Props {
  updateDropdown: () => void
}

export default function AllCategoriesDropdownView({ updateDropdown }: Props) {
  return (
    <div className="sticky z-50 w-full bg-white h-full left-0 top-72 flex flex-col">
      <div className="content bg-white z-40 left-0 top-20 mx-auto flex justify-start justify-between container">
        <CategorySidebarList />
        <CategoryMainList />
      </div>
      <div
        className="overlay-wrapper cursor-pointer flex z-50 w-full  flex left-0"
        onClick={updateDropdown}
      />
      <style jsx>
        {`
          .overlay-wrapper {
            background: rgba(8, 7, 8, 0.32);
            height: 40vh;
          }
        `}
      </style>
    </div>
  )
}
