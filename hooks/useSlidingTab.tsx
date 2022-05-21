/* eslint-disable react-hooks/exhaustive-deps */
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

  useEffect(() => {
    if (slidingTab !== null) {
      setLocked(true)
    }
    setLocked(false)
  }, [slidingTab])

  return {
    updateSlideTab,
    slidingTab,
    activeProductSlide,
  }
}
