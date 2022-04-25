import { useAppDispatch } from '@/redux/store'
import { toggleAppModal } from '@/redux/ui-slice'
import type { typeModal } from '@/types'

import { useAppSelector } from './useRedux'

export default function useModal() {
  const { displayModal } = useAppSelector((state) => state.UI)
  const dispatch = useAppDispatch()

  function onShowModal(modalType: typeModal, data: string) {
    dispatch(
      toggleAppModal({
        type: modalType,
        data,
      })
    )
  }

  function onHideModal() {
    dispatch(
      toggleAppModal({
        type: null,
      })
    )
  }

  return {
    modal: displayModal,
    onHideModal,
    onShowModal,
  }
}
