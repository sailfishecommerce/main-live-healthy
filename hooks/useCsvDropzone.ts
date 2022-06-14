/* eslint-disable react-hooks/exhaustive-deps */
import Papa from 'papaparse'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'

type uploadCSVType = (results: { data: any[] }, setProgress: any) => void

export default function useCSVDropzone(uploadCSV: uploadCSVType) {
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
    const csvFile = acceptedFiles[0]
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        uploadCSV(results, setProgress)
        await new Promise((resolve) => {
          setTimeout(() => resolve('success'), 1000)
        })
        setProgress(0)
      },
    })
  }, [])

  const dropzone = useDropzone({
    onDrop,
    accept: {
      '.csv': [
        '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
      ],
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
