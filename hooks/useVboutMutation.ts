import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import useToast from '@/hooks/useToast'
import { addEmailToNewsletter, contactusFormList } from '@/hooks/useVbout'

type addEmailToNewsletterType = {
  email: string
  listid: number
}

export default function useVboutMutation() {
  const { loadingToast, updateToast } = useToast()
  const queryClient = useQueryClient()

  function useAddEmailToNewsletter() {
    const toastID = useRef(null)

    return useMutation(
      ({ email, listid }: addEmailToNewsletterType) =>
        addEmailToNewsletter(email, listid),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, 'thanks for subscribing')
        },
        onError: () => {
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            'error subscribing to newsletter'
          )
        },
      }
    )
  }

  type contactusFormListType = {
    name: string
    email: string
    phone: string
    subject: string
    message: string
  }

  function useContactForm() {
    const toastID = useRef(null)

    return useMutation(
      ({ name, email, phone, subject, message }: contactusFormListType) =>
        contactusFormList(name, email, phone, subject, message),
      {
        onMutate: () => {
          loadingToast(toastID)
        },
        onSettled: () => {
          queryClient.invalidateQueries('cart')
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, 'thanks for messaging us')
        },
        onError: () => {
          updateToast(toastID, toast.TYPE.ERROR, 'an error occured')
        },
      }
    )
  }

  return {
    useAddEmailToNewsletter,
    useContactForm,
  }
}
