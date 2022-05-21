import { useAtom } from 'jotai'

import useBodyLock from '@/hooks/useBodyLock'
import { mobileViewAtom } from '@/lib/atomConfig'

export default function useNav() {
  const [mobileView, setMobileView] = useAtom(mobileViewAtom)
  const { mobileMenu, showMobileSearch } = mobileView
  const [locked, setLocked] = useBodyLock()

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
    setLocked(!locked)
  }

  return {
    toggleSearch,
    toggleMobileMenu,
    mobileMenu,
    showMobileSearch,
  }
}
