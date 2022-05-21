import { useAtom } from 'jotai'

import { appModalAtom } from '@/lib/atomConfig'
import type { typeModal } from '@/types'

export default function useModal() {
  const [appModal, setAppModal] = useAtom(appModalAtom)
  // useLockedBody(mobileExpanded)

  function onShowModal(modalType: typeModal, data: string) {
    setAppModal({
      type: modalType,
      data,
    })
  }

  function onHideModal() {
    setAppModal({
      type: null,
    })
  }

  return {
    modal: appModal,
    onHideModal,
    onShowModal,
  }
}
