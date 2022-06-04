import { useAtom } from 'jotai'

import MobileCategoryView from '@/components/Menu/MobileCategoryView'
import MobileMenuView from '@/components/Menu/MobileMenuView'
import { mobileSlideMenuViewAtom } from '@/lib/atomConfig'

export default function MobileSlideMenu() {
  const [mobileSlideMenuView] = useAtom(mobileSlideMenuViewAtom)

  return (
    <>
      <aside className="MobileSlideMenu fixed top-0 left-0 z-50 bg-white w-full">
        {mobileSlideMenuView === 'LINK' ? (
          <MobileMenuView />
        ) : (
          mobileSlideMenuView === 'SUBMENU' && <MobileCategoryView />
        )}
      </aside>
      <style jsx>{`
        aside.MobileSlideMenu {
          height: 100vh;
        }
      `}</style>
    </>
  )
}
