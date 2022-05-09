import { useAtom } from 'jotai'

import MobileCategoryView from '@/components/Menu/MobileCategoryView'
import MobileMenuView from '@/components/Menu/MobileMenuView'
import { mobileSlideMenuViewAtom } from '@/lib/atomConfig'

export default function MobileSlideMenu() {
  const [mobileSlideMenuView] = useAtom(mobileSlideMenuViewAtom)

  return (
    <aside>
      {mobileSlideMenuView === 'LINK' ? (
        <MobileMenuView />
      ) : (
        mobileSlideMenuView === 'SUBMENU' && <MobileCategoryView />
      )}
    </aside>
  )
}
