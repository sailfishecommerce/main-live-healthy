/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'
import useToast from '@/hooks/useToast'
import uploadMediaToCloudinary from '@/utils/uploadMediaToCloudinary'

export default function useMediaUpload(dbNode?: string) {
  const toastID = useRef(null)
  const toastNotification = useToast()
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    uploadMediaToCloudinary(
      acceptedFiles,
      toastID,
      toastNotification,
      setIsUploadSuccessful,
      dbNode
    )
  }, [])

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
