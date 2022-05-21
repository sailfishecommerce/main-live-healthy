import { useAtom } from 'jotai'
import { useEffect } from 'react'

import useBodyLock from '@/hooks/useBodyLock'
import { activeProductSlideAtom, slidingTabAtom } from '@/lib/atomConfig'

export default function useSlidingTab() {
  const [slidingTab, setSlidingTab]: any = useAtom<boolean | null>(
    slidingTabAtom
  )
  const [activeProductSlide]: any = useAtom<any>(activeProductSlideAtom)
  const [, setLocked] = useBodyLock()

  const updateSlideTab = (
    slideTabState: 'SLIDING-ACCOUNT' | 'SLIDING-CART' | 'SLIDING-INFO' | null
  ) => {
    setSlidingTab(slideTabState)
  }

  console.log('slidingTabslidingTab', slidingTab)

  useEffect(() => {
    if (slidingTab === null) {
      setLocked(false)
    } else if (slidingTab !== null) {
      setLocked(true)
    }
  }, [slidingTab, setLocked])

  return {
    updateSlideTab,
    slidingTab,
    activeProductSlide,
  }
}
