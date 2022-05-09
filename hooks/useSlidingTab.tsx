import { useAtom } from 'jotai'

import { slidingTabAtom } from '@/lib/atomConfig'

export default function useSlidingTab() {
  const [slidingTab, setSlidingTab]: any = useAtom<boolean | null>(
    slidingTabAtom
  )

  const updateSlideTab = (
    slideTabState: 'SLIDING-ACCOUNT' | 'SLIDING-CART' | 'SLIDING-INFO' | null
  ) => setSlidingTab(slideTabState)

  return {
    updateSlideTab,
    slidingTab,
  }
}
