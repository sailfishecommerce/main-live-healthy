import { BsArrowLeft } from 'react-icons/bs'

import AlgoliaCategories from '@/components/Algolia/AlgoliaCategories'
import { useAppDispatch } from '@/hooks/useRedux'
import { updateMobileSlideMenuView } from '@/redux/ui-slice'

export default function MobileCategoryView() {
  const dispatch = useAppDispatch()
  const displayMenu = () => dispatch(updateMobileSlideMenuView('SUBMENU'))
  return (
    <div className="submenus px-4">
      <div className="back-to-menu border-b border-gray-300 pb-4">
        <button
          type="button"
          className="flex items-center font-semibold"
          onClick={displayMenu}
        >
          <BsArrowLeft className="mr-2" />
          <h4>Back to menu</h4>
        </button>
      </div>
      <div className="content pt-3">
        <AlgoliaCategories />
      </div>
    </div>
  )
}
