import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { toggleSlideTab } from '@/redux/ui-slice'

export default function useSlidingTab() {
  const dispatch = useAppDispatch()
  const { slideTab } = useAppSelector((state) => state.UI)

  const updateSlideTab = (
    slideTabState: 'SLIDING-ACCOUNT' | 'SLIDING-CART' | 'SLIDING-INFO' | null
  ) => dispatch(toggleSlideTab(slideTabState))

  return {
    updateSlideTab,
    slideTab,
  }
}
