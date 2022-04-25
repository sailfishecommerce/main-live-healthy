import { useAppSelector } from '@/hooks/useRedux'
import { useAppDispatch } from '@/redux/store'
import { toggleAuthModal, updateCategoryDropdown } from '@/redux/ui-slice'

export default function useUI() {
  const { categoryDropdown, displayAuthModal } = useAppSelector(
    (state) => state.UI
  )
  const dispatch = useAppDispatch()

  function toggleCategoriesDropdown() {
    return dispatch(updateCategoryDropdown())
  }

  function toggleAuthModalHandler() {
    dispatch(toggleAuthModal())
  }

  return {
    categoryDropdown,
    displayAuthModal,
    toggleCategoriesDropdown,
    toggleAuthModalHandler,
  }
}
