/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import type { MutableRefObject, ReactText } from 'react'
import { toast } from 'react-toastify'

import { appLoadingAtom } from '@/lib/atomConfig'

export default function useToast() {
  const [appLoading, setAppLoading] = useAtom(appLoadingAtom)

  const loadingToast = (toastId: MutableRefObject<any>) =>
    (toastId.current = toast('Processing ...', {
      isLoading: true,
      autoClose: false,
    }))

  const updateToast = (
    toastId: MutableRefObject<any>,
    toastType: any,
    message: string
  ) =>
    toast.update(toastId.current, {
      type: toastType,
      autoClose: 500,
      render: message,
      isLoading: false,
    })

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
    loadingToast,
    updateToast,
  }
}
