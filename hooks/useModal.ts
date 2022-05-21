import { useAtom } from 'jotai'

import useBodyLock from '@/hooks/useBodyLock'
import { appModalAtom } from '@/lib/atomConfig'
import type { typeModal } from '@/types'

export default function useModal() {
  const [appModal, setAppModal] = useAtom(appModalAtom)
  // useLockedBody(mobileExpanded)
  const [, setLocked] = useBodyLock()

  function onShowModal(modalType: typeModal, data: string) {
    setAppModal({
      type: modalType,
      data,
    })
    setLocked(true)
  }

  function onHideModal() {
    setAppModal({
      type: null,
    })
    setLocked(false)
  }

  return {
    modal: appModal,
    onHideModal,
    onShowModal,
  }
}
