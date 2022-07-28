import dynamic from 'next/dynamic'
import { memo, Suspense } from 'react'

import PrimaryMenu from '@/components/Menu/PrimaryMenu'
import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import useNavStyle from '@/hooks/useNavStyle'

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
        <Suspense fallback={'Loading...'}>
          {!mobileWidth && !scrollUp && <DynamicSecondaryMenu />}
          {mobileWidth && showMobileSearch && <DynamicMobileSearchbar />}
        </Suspense>
      </nav>
    </>
  )
}
const Menu = memo(MenuComponent)

export default Menu
