import dynamic from 'next/dynamic'
import { useState } from 'react'

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
  const [showNoticebar, setShowNoticebar] = useState(true)
  const toggleNoticebar = () => setShowNoticebar(!showNoticebar)
  const { navStyle } = useNavStyle()
  const { mobileMenu } = useNav()
  const { categoryDropdown, toggleCategoriesDropdown } = useUI()

  const mobileWidth = useMediaQuery('(max-width:768px)')
  const displayShadow = mobileWidth ? 'header' : ''
  return (
    <>
      <header
        className={`${navStyle} ${displayShadow} bg-white w-full pb-0  md:pb-2`}
      >
        {showNoticebar && <Noticebar toggleBarVisibility={toggleNoticebar} />}
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
