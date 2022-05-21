import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'

import { appModalAtom } from '@/lib/atomConfig'
import type { typeModal } from '@/types'

export default function useModal() {
  const [appModal, setAppModal] = useAtom(appModalAtom)

  function onShowModal(modalType: typeModal, data: string) {
    setAppModal({
      type: modalType,
      data,
    })
    disableBodyScroll(document.body)
  }

  function onHideModal() {
    setAppModal({
      type: null,
    })
    enableBodyScroll(document.body)
  }

  return {
    modal: appModal,
    onHideModal,
    onShowModal,
  }
}
