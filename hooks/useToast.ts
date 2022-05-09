import { useAtom } from 'jotai'
import type { ReactText } from 'react'
import { toast } from 'react-toastify'

import { appLoadingAtom } from '@/lib/atomConfig'

export default function useToast() {
  const [appLoading, setAppLoading] = useAtom(appLoadingAtom)

  function isLoading(): ReactText {
    setAppLoading(true)
    const toastId = toast.loading('Processing...', {
      position: 'top-left',
    })
    return toastId
  }

  function isSuccessful(toastId: any, message: string) {
    setAppLoading(false)
    toast.update(toastId, {
      render: message,
      type: 'success',
      isLoading: false,
      position: 'top-left',
      closeButton: true,
      autoClose: 5000,
    })
  }

  function hasError(toastId: any, message: string) {
    setAppLoading(false)
    toast.update(toastId, {
      render: message,
      type: 'error',
      isLoading: false,
      position: 'top-left',
      closeButton: true,
      autoClose: 5000,
    })
  }

  return {
    appLoading,
    isLoading,
    isSuccessful,
    hasError,
  }
}
