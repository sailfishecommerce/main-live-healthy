/* eslint-disable no-console */
import axios from 'axios'
import type { MutableRefObject } from 'react'
import { v4 as uuidv4 } from 'uuid'

import firebaseDatabase from '@/lib/firebaseDatabase'

export default function uploadMediaToCloudinary(
  media: any,
  toastID: MutableRefObject<null>,
  toastNotification: {
    loadingToast: (toastID: MutableRefObject<null>) => void
    updateToast: (
      toastID: MutableRefObject<null>,
      info: string,
      message: string
    ) => void
  }
) {
  toastNotification.loadingToast(toastID)
  media.map((mediaItem: Blob | any) => {
    const formData = new FormData()
    formData.append('file', mediaItem)
    formData.append('upload_preset', 'live_healthy_store')
    formData.append('api_key', `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`)
    const mediaId = uuidv4()

    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((response) => {
        console.log('upload-response', response)
        const { writeData } = firebaseDatabase()
        writeData(`media/${mediaId}`, JSON.stringify(response.data.url))
        toastNotification.updateToast(
          toastID,
          'success',
          'Logo upload successful'
        )
      })
      .catch((err) => {
        console.log('image-upload-err', err)
        return toastNotification.updateToast(toastID, 'error', 'upload error')
      })
  })
}
