import type { ReactText } from 'react'
import { toast } from 'react-toastify'

import useLoading from '@/hooks/useLoading'

export default function useToast() {
  const { updateLoadingState } = useLoading()

  function isLoading(): ReactText {
    updateLoadingState()
    const toastId = toast.loading('Processing...', {
      position: 'top-left',
    })
    return toastId
  }

  function isSuccessful(toastId: any, message: string) {
    updateLoadingState()
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
    updateLoadingState()
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
    isLoading,
    isSuccessful,
    hasError,
  }
}
