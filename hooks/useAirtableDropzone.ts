/* eslint-disable no-console */
import axios from 'axios'
import Papa from 'papaparse'
import { useCallback, useState } from 'react'

export default function useAirtableDropzone() {
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
    const csvFile = acceptedFiles[0]
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        console.log('results.data', results.data)
        results.data.map((dataItem: any) =>
          axios.post('/api/upload-csv-to-swell', dataItem, {
            onUploadProgress: (progressEvent: any) => {
              console.log('progressEvent', progressEvent)
              const progressVal =
                (progressEvent.loaded / progressEvent.total) * 50
              setProgress(progressVal)
            },
            onDownloadProgress: (progressEvent: any) => {
              const progressVal =
                50 + (progressEvent.loaded / progressEvent.total) * 50
              console.log('progressVal', progressVal)
              setProgress(progressVal)
            },
          })
        )
        await new Promise((resolve) => {
          setTimeout(() => resolve('success'), 500)
        })
        setProgress(0)
      },
    })
  }, [])

  return { onDrop, progress }
}
