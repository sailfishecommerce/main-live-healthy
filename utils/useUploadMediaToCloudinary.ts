/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useToast from '@/hooks/useToast'
import firebaseDatabase from '@/lib/firebaseDatabase'

function formatAuthorName(name: string) {
  return name.toLowerCase().replace(/\s/g, '-')
}

type blogFormDatatType = {
  dbNode: string
  data: {
    authorName: string
    aboutAuthor: string
  }
}

type cloudinaryResponseType = {
  isUploadSuccessful: boolean | null
  data: any | null
}
export default function useUploadMediaToCloudinary() {
  const toastID = useRef(null)
  const toastNotification = useToast()
  const [cloudinaryResponse, setCloudinaryResponse] =
    useState<cloudinaryResponseType>({
      isUploadSuccessful: null,
      data: null,
    })

  function uploadMedia(media: any[], blogFormData?: blogFormDatatType) {
    toastNotification.loadingToast(toastID)
    media.map((mediaItem: Blob | any) => {
      const formData = new FormData()
      formData.append('file', mediaItem)
      formData.append(
        'api_key',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`
      )
      formData.append('upload_preset', 'live_healthy_store')
      const mediaId = uuidv4()

      console.log('blogFormData', blogFormData)

      function saveToDB(response: any) {
        const { writeData } = firebaseDatabase()
        const { secure_url, public_id, signature, version } = response.data

        return blogFormData
          ? writeData(
              `${blogFormData.dbNode}/${formatAuthorName(
                blogFormData?.data?.authorName
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
          setCloudinaryResponse({
            ...cloudinaryResponse,
            isUploadSuccessful: true,
            data: response.data,
          })
        })
        .catch((err) => {
          console.log('image-upload-err', err)
          setCloudinaryResponse({
            ...cloudinaryResponse,
            isUploadSuccessful: false,
            data: null,
          })
          return toastNotification.updateToast(toastID, 'error', 'upload error')
        })
    })
  }

  const isUploadSuccessful = cloudinaryResponse.isUploadSuccessful

  return { uploadMedia, isUploadSuccessful }
}
