import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useAtom } from 'jotai'

import { modalAtom } from '@/lib/atomConfig'
import type { modalType } from '@/typings/atomtype'

export default function useModal() {
  const [modal, setModal]: any = useAtom<modalType>(modalAtom)

  function updateModalView(modalState: modalType) {
    return setModal(modalState)
  }

  if (modal === null) {
    enableBodyScroll(document.body)
  } else {
    disableBodyScroll(document.body)
  }

  return {
    modal,
    updateModalView,
  }
}
