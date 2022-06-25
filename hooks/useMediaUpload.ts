/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'
import type { blogFormDataType } from '@/types'
import useUploadMediaToCloudinary from '@/utils/useUploadMediaToCloudinary'

export default function useMediaUpload(
  blogFormData?: blogFormDataType,
  shouldUpload?: boolean
) {
  const { uploadMedia, isUploadSuccessful } = useUploadMediaToCloudinary()

  const normalMediaUpload = useCallback((acceptedFiles) => {
    uploadMedia(acceptedFiles)
  }, [])

  const blogAuthorMediaUpload = useCallback(
    (acceptedFiles) => {
      if (shouldUpload && acceptedFiles) {
        uploadMedia(acceptedFiles, blogFormData)
      }
    },
    [shouldUpload]
  )

  const onDrop = blogFormData ? blogAuthorMediaUpload : normalMediaUpload

  const dropzone = useDropzone({
    onDrop,
    accept: {
      '.png': ['image/png'],
      '.jpg': ['image/jpeg'],
      '.webp': ['image/webp'],
      '.gif': ['image/gif'],
    },
  })

  const style: any = useMemo(
    () => ({
      ...styles.baseStyle,
      ...(dropzone.isFocused ? styles.focusedStyle : {}),
      ...(dropzone.isDragAccept ? styles.acceptStyle : {}),
      ...(dropzone.isDragReject ? styles.rejectStyle : {}),
    }),
    [dropzone.isFocused, dropzone.isDragAccept, dropzone.isDragReject]
  )

  return { dropzone, style, isUploadSuccessful }
}
