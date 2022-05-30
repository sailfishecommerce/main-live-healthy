import dynamic from 'next/dynamic'
import { memo } from 'react'

import Logo from '@/components/Logo'
import { useMediaQuery } from '@/hooks'

const DynamicMobilePrimaryMenu = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicMobilePrimaryMenu' */ '@/components/Menu/MobilePrimaryMenu'
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
    <div className="flex justify-between items-center lg:px-4 xl:px-0 md:my-2  xl:py-4">
      <Logo className="w-1/3 lg:w-1/6" />
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
