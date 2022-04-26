import { useAppSelector } from '@/hooks/useRedux'
import { useAppDispatch } from '@/redux/store'
import {
  toggleAuthModal,
  toggleNoticebar,
  updateCategoryDropdown,
} from '@/redux/ui-slice'

export default function useUI() {
  const { categoryDropdown, displayAuthModal, noticebar } = useAppSelector(
    (state) => state.UI
  )
  const dispatch = useAppDispatch()

  function toggleCategoriesDropdown() {
    return dispatch(updateCategoryDropdown())
  }

  function toggleAuthModalHandler() {
    dispatch(toggleAuthModal())
  }

  function toggleNoticebarHandler() {
    dispatch(toggleNoticebar)
  }

  return {
    categoryDropdown,
    displayAuthModal,
    noticebar,
    toggleNoticebarHandler,
    toggleCategoriesDropdown,
    toggleAuthModalHandler,
  }
}
