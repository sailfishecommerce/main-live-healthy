import { useAtom } from 'jotai'

import {
  categoryDropdownAtom,
  modalAtom,
  noticebarAtom,
} from '@/lib/atomConfig'
import type { modalType } from '@/typings/atomtype'

export default function useUI() {
  const [noticebar, setNoticebar] = useAtom(noticebarAtom)
  const [modal, setModal]: any = useAtom<'SLIDING-CART' | null>(modalAtom)

  const [categoryDropdown, setCategoryDropdown] = useAtom(categoryDropdownAtom)

  function toggleCategoryDropdownHandler() {
    return setCategoryDropdown((prev) => !prev)
  }

  function toggleNoticebar() {
    return setNoticebar((prevState) => !prevState)
  }

  function toggleModalHandler(value: modalType) {
    return setModal(value)
  }

  return {
    modal,
    noticebar,
    categoryDropdown,
    toggleCategoryDropdownHandler,
    toggleNoticebar,
    toggleModalHandler,
  }
}
