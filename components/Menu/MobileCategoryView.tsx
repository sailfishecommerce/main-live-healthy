import { useAtom } from 'jotai'
import { BsArrowLeft } from 'react-icons/bs'

import AlgoliaCategories from '@/components/Algolia/AlgoliaCategories'
import { mobileSlideMenuViewAtom } from '@/lib/atomConfig'

export default function MobileCategoryView() {
  const [, setUpdateMobileSlideMenu] = useAtom(mobileSlideMenuViewAtom)
  const displayMenu = () => setUpdateMobileSlideMenu('LINK')
  return (
    <div className="submenus px-4 pt-4">
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
