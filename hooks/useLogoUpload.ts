import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'

export default function useLogoUpload() {
  const [progress, setProgress] = useState({
    uploaded: 0,
    total: 0,
    loading: false,
    error: null,
  })

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedImage = acceptedFiles[0]
    console.log('uploadedImage', uploadedImage)
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

  return { progress, dropzone, style }
}
