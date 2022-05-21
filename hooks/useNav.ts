/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import useBodyLock from '@/hooks/useBodyLock'
import { mobileViewAtom } from '@/lib/atomConfig'

export default function useNav() {
  const [mobileView, setMobileView] = useAtom(mobileViewAtom)
  const { mobileMenu, showMobileSearch } = mobileView
  const [, setLocked] = useBodyLock()

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
    if (mobileMenu || showMobileSearch) {
      setLocked(true)
    }
    setLocked(false)
  }, [mobileMenu, showMobileSearch])

  return {
    toggleSearch,
    toggleMobileMenu,
    mobileMenu,
    showMobileSearch,
  }
}
