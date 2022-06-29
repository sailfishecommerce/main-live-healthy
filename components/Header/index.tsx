import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { memo } from 'react'

import Noticebar from '@/components/Alerts/Noticebar'
import HeaderBanner from '@/components/Header/HeaderBanner'
import Menu from '@/components/Menu'
import { useMediaQuery } from '@/hooks'
import useNavStyle from '@/hooks/useNavStyle'
import { categoryDropdownAtom, noticebarAtom } from '@/lib/atomConfig'
import CookieNotification from '../Notification/CookieNotification'

const DynamicAllCategoriesDropdownView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AllCategoriesDropdownView' */ '@/components/Dropdown/AllCategoriesDropdownView'
    )
)

function HeaderComponent() {
  const { navStyle } = useNavStyle()
  const [noticebar, setNoticebar] = useAtom(noticebarAtom)
  const [categoryDropdown, setCategoryDropdown] = useAtom(categoryDropdownAtom)

  function toggleCategoryDropdownHandler() {
    return setCategoryDropdown((prev) => !prev)
  }

  if (typeof window !== 'undefined') {
    if (categoryDropdown) {
      disableBodyScroll(document.body)
    } else {
      enableBodyScroll(document.body)
    }
  }

  function toggleNoticebar() {
    return setNoticebar((prevState) => !prevState)
  }
  // const { mobileMenu } = useNav()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const displayShadow = mobileWidth ? 'header' : ''

  return (
    <>
      <header
        className={`${navStyle} ${displayShadow} bg-white w-full pb-0  md:pb-2`}
      >
        <CookieNotification />
        <HeaderBanner />
        {noticebar && <Noticebar toggleBarVisibility={toggleNoticebar} />}
        <Menu />
      </header>
      {categoryDropdown && !mobileWidth && (
        <DynamicAllCategoriesDropdownView
          updateDropdown={toggleCategoryDropdownHandler}
        />
      )}
    </>
  )
}
const Header = memo(HeaderComponent)
export default Header
