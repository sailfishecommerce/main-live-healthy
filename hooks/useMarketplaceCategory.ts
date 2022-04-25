import { useAppDispatch } from '@/hooks/useRedux'
import { updateDefaultMenuRefinement } from '@/redux/algolia-slice'

export default function useMarketplaceCategory() {
  const dispatch = useAppDispatch()

  function selectedFooterCategory(category: string) {
    dispatch(updateDefaultMenuRefinement(category))
  }

  return selectedFooterCategory
}
