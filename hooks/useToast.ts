/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import type { MutableRefObject } from 'react'
import { toast } from 'react-toastify'

import { appLoadingAtom } from '@/lib/atomConfig'

export default function useToast() {
  const [appLoading, setAppLoading] = useAtom(appLoadingAtom)

  const loadingToast = (toastId: MutableRefObject<any>) => {
    setAppLoading(true)
    toastId.current = toast('Processing ...', {
      isLoading: true,
      autoClose: false,
    })
  }
  const updateToast = (
    toastId: MutableRefObject<any>,
    toastType?: any,
    message?: string
  ) => {
    const autoCloseStatus = toastType === 'success' ? 800 : false
    setAppLoading(false)
    return toast.update(toastId.current, {
      type: toastType,
      autoClose: autoCloseStatus,
      render: message,
      isLoading: false,
    })
  }

  return {
    appLoading,
    loadingToast,
    updateToast,
  }
}
