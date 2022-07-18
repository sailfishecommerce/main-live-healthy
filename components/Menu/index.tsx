import dynamic from 'next/dynamic'
import { memo } from 'react'

// import PrimaryMenu from '@/components/Menu/PrimaryMenu'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import useNavStyle from '@/hooks/useNavStyle'

const PrimaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'PrimaryMenu' */ '@/components/Menu/PrimaryMenu'
    ),
  { ssr: false }
)

const DynamicSecondaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SecondaryMenu' */ '@/components/Menu/SecondaryMenu'
    ),
  { ssr: false }
)

const DynamicMobileSearchbar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobileSearchbar' */ '@/components/Search/MobileSearchbar'
    )
)

function MenuComponent() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { showMobileSearch } = useNav()
  const { scrollUp } = useNavStyle()

  return (
    <>
      <nav className="nav mx-auto container px-4 pb-3 md:pb-0">
        <PrimaryMenu />
        {!mobileWidth && !scrollUp && <DynamicSecondaryMenu />}
        {mobileWidth && showMobileSearch && <DynamicMobileSearchbar />}
      </nav>
    </>
  )
}
const Menu = memo(MenuComponent)

export default Menu
