import { memo } from 'react'

import Logo from '@/components/Logo'
import MenuIcons from '@/components/Menu/MenuIcons'
import MenuLinks from '@/components/Menu/MenuLinks'
import MobilePrimaryMenu from '@/components/Menu/MobilePrimaryMenu'
import { useMediaQuery } from '@/hooks'

function PrimaryMenuComponent() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  return (
    <div className="flex justify-between items-center md:my-2 md:py-4">
      <Logo className="w-1/3 md:w-1/6" />
      {mobileWidth ? (
        <MobilePrimaryMenu />
      ) : (
        <div className="flex w-4/6 justify-between">
          <MenuLinks />
          <MenuIcons />
        </div>
      )}
    </div>
  )
}

const PrimaryMenu = memo(PrimaryMenuComponent)
export default PrimaryMenu
