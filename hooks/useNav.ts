/* eslint-disable react-hooks/exhaustive-deps */
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { mobileViewAtom } from '@/lib/atomConfig'

export default function useNav() {
  const [mobileView, setMobileView] = useAtom(mobileViewAtom)
  const { mobileMenu, showMobileSearch } = mobileView
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const toggleSearch = () =>
    setMobileView((prev) => ({
      mobileMenu: prev.mobileMenu,
      showMobileSearch: !prev.showMobileSearch,
    }))

  const toggleMobileMenu = () => {
    setMobileView((prev) => ({
      mobileMenu: !prev.mobileMenu,
      showMobileSearch: prev.showMobileSearch,
    }))
  }

  useEffect(() => {
    if (mobileWidth) {
      if (mobileMenu) {
        disableBodyScroll(document.body)
      } else {
        enableBodyScroll(document.body)
      }
    }
  }, [mobileMenu])

  return {
    toggleSearch,
    toggleMobileMenu,
    mobileMenu,
    showMobileSearch,
  }
}
