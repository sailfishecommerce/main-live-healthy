import dynamic from 'next/dynamic'

import Noticebar from '@/components/Alerts/Noticebar'
import Menu from '@/components/Menu'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import useNavStyle from '@/hooks/useNavStyle'
import useUI from '@/hooks/useUI'

const DynamicMobileSlideMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobileSlideMenu' */ '@/components/Menu/MobileSlideMenu'
    )
)

const DynamicAllCategoriesDropdownView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AllCategoriesDropdownView' */ '@/components/Dropdown/AllCategoriesDropdownView'
    )
)

export default function Header() {
  const { navStyle } = useNavStyle()
  const { mobileMenu } = useNav()
  const {
    categoryDropdown,
    toggleCategoriesDropdown,
    noticebar,
    toggleNoticebarHandler,
  } = useUI()

  const mobileWidth = useMediaQuery('(max-width:768px)')
  const displayShadow = mobileWidth ? 'header' : ''
  return (
    <>
      <header
        className={`${navStyle} ${displayShadow} bg-white w-full pb-0  md:pb-2`}
      >
        {noticebar && (
          <Noticebar toggleBarVisibility={toggleNoticebarHandler} />
        )}
        <Menu />
        {mobileWidth && mobileMenu && <DynamicMobileSlideMenu />}
        {categoryDropdown && (
          <DynamicAllCategoriesDropdownView
            updateDropdown={toggleCategoriesDropdown}
          />
        )}
      </header>
      {}
    </>
  )
}
