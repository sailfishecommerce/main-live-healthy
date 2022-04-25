import { useState } from 'react'

import { useMediaQuery } from '@/hooks'

export default function useNav(): any {
  const tabWidth = useMediaQuery('(max-width:768px)')
  const [nav, setNav] = useState<'desktopNav' | 'mobileNav' | undefined>(
    undefined
  )

  const showNavMenuDesktop = () => setNav('desktopNav')

  const toggleMobileMenuHandler = () => setNav('mobileNav')

  const navMenuFunction = tabWidth
    ? toggleMobileMenuHandler
    : showNavMenuDesktop

  return { navMenuFunction, nav }
}
