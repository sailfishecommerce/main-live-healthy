import MobileCategoryView from '@/components/Menu/MobileCategoryView'
import MobileMenuView from '@/components/Menu/MobileMenuView'
import { useAppSelector } from '@/hooks/useRedux'

export default function MobileSlideMenu() {
  const { mobileSlideMenuView } = useAppSelector((state) => state.UI)
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
