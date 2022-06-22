/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'
import useToast from '@/hooks/useToast'
import uploadLogotoCloudinary from '@/utils/uploadToCloudinary'

export default function useLogoUpload() {
  const toastID = useRef(null)
  const toastNotification = useToast()
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedImage = acceptedFiles[0]
    uploadLogotoCloudinary(
      uploadedImage,
      toastID,
      toastNotification,
      setIsUploadSuccessful
    )
  }, [])

  const dropzone = useDropzone({
    onDrop,
    accept: {
      '.png': ['image/png'],
      '.jpg': ['image/jpeg'],
      '.webp': ['image/webp'],
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
