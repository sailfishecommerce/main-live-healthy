import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'

import { activeProductSlideAtom, slidingTabAtom } from '@/lib/atomConfig'

export default function useSlidingTab() {
  const [slidingTab, setSlidingTab]: any = useAtom<boolean | null>(
    slidingTabAtom
  )
  const [activeProductSlide]: any = useAtom<any>(activeProductSlideAtom)

  const updateSlideTab = (
    slideTabState:
      | 'SLIDING-ACCOUNT-SHIPPING'
      | 'SLIDING-ACCOUNT'
      | 'SLIDING-CART'
      | 'SLIDING-INFO'
      | null
  ) => {
    setSlidingTab(slideTabState)
    if (slideTabState === null) {
      enableBodyScroll(document.body)
    } else if (slideTabState !== null) {
      disableBodyScroll(document.body)
    }
  }

  return {
    updateSlideTab,
    slidingTab,
    activeProductSlide,
  }
}
