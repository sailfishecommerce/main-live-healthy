/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios'
import type { MutableRefObject } from 'react'
import { v4 as uuidv4 } from 'uuid'

import firebaseDatabase from '@/lib/firebaseDatabase'

function formatAuthorName(name: string) {
  return name.toLowerCase().replace(/\s/g, '-')
}

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
  },
  setIsUploadSuccessful: any,
  blogFormData?: {
    dbNode: string
    data: {
      authorName: string
      aboutAuthor: string
    }
  }
) {
  toastNotification.loadingToast(toastID)
  media.map((mediaItem: Blob | any) => {
    const formData = new FormData()
    formData.append('file', mediaItem)
    formData.append('api_key', `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`)
    formData.append('upload_preset', 'live_healthy_store')
    const mediaId = uuidv4()

    function saveToDB(response: any) {
      const { writeData } = firebaseDatabase()
      const { secure_url, public_id, signature, version } = response.data
      return blogFormData?.dbNode
        ? writeData(
            `${blogFormData.dbNode}/${formatAuthorName(
              blogFormData.data.authorName
            )}`,
            JSON.stringify({
              url: secure_url,
              ...blogFormData?.data,
            })
          )
        : writeData(
            `media/${mediaId}`,
            JSON.stringify({
              url: secure_url,
              public_id,
              signature,
              version,
            })
          )
    }

    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((response) => {
        console.log('upload-response', response)
        saveToDB(response)
        toastNotification.updateToast(
          toastID,
          'success',
          'Logo upload successful'
        )
        setIsUploadSuccessful(true)
      })
      .catch((err) => {
        console.log('image-upload-err', err)
        setIsUploadSuccessful(false)
        return toastNotification.updateToast(toastID, 'error', 'upload error')
      })
  })
}
