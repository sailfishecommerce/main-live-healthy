import { useAppSelector } from '@/hooks/useRedux'
import { useAppDispatch } from '@/redux/store'
import {
  toggleAuthModal,
  toggleLogoutModal,
  toggleNoticebar,
  updateCategoryDropdown,
} from '@/redux/ui-slice'

export default function useUI() {
  const { categoryDropdown, displayAuthModal, noticebar, displayLogoutModal } =
    useAppSelector((state) => state.UI)
  const dispatch = useAppDispatch()

  function toggleCategoriesDropdown() {
    return dispatch(updateCategoryDropdown())
  }

  function toggleAuthModalHandler() {
    dispatch(toggleAuthModal())
  }

  function toggleNoticebarHandler() {
    dispatch(toggleNoticebar())
  }

  function toggleLogoutModalHandler() {
    dispatch(toggleLogoutModal())
  }

  return {
    categoryDropdown,
    displayAuthModal,
    noticebar,
    toggleNoticebarHandler,
    toggleCategoriesDropdown,
    displayLogoutModal,
    toggleAuthModalHandler,
    toggleLogoutModalHandler,
  }
}
