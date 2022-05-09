import { useAtom } from 'jotai'

import { mobileViewAtom } from '@/lib/atomConfig'

export default function useNav() {
  const [mobileView, setMobileView] = useAtom(mobileViewAtom)
  const { mobileMenu, showMobileSearch } = mobileView

  const toggleSearch = () =>
    setMobileView((prev) => ({
      mobileMenu: prev.mobileMenu,
      showMobileSearch: !prev.showMobileSearch,
    }))

  const toggleMobileMenu = () =>
    setMobileView((prev) => ({
      mobileMenu: !prev.mobileMenu,
      showMobileSearch: prev.showMobileSearch,
    }))

  return {
    toggleSearch,
    toggleMobileMenu,
    mobileMenu,
    showMobileSearch,
  }
}
