import dynamic from 'next/dynamic'
import { memo } from 'react'

import Logo from '@/components/Logo'
import { useMediaQuery } from '@/hooks'

const DynamicMobilePrimaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MobilePrimaryMenu' */ '@/components/Menu/MobilePrimaryMenu'
    )
)

const DynamicLaptopPrimaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicLaptopPrimaryMenu' */ '@/components/Menu/LaptopPrimaryMenu'
    ),
  { ssr: false }
)

function PrimaryMenuComponent() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  return (
    <div className="flex justify-between items-center lg:px-4 xl:px-0 md:my-2  xl:pt-4">
      <Logo className="w-1/3 md:w-1/5" />
      {mobileWidth ? (
        <DynamicMobilePrimaryMenu />
      ) : (
        <DynamicLaptopPrimaryMenu />
      )}
    </div>
  )
}

const PrimaryMenu = memo(PrimaryMenuComponent)
export default PrimaryMenu
