/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

import Dropzonebar from '@/components/Dropzonebar'
import useCSVDropzone from '@/hooks/useCsvDropzone'
import useToast from '@/hooks/useToast'
import uploadCSV from '@/utils/uploadCSV'

export default function UploadToSwellFromAirtable() {
  const { progress, dropzone, style } = useCSVDropzone(uploadCSV)
  const { loadingToast, toastUpdate } = useToast()
  const toastID = useRef(null)

  useEffect(() => {
    if (progress.loading) {
      loadingToast(toastID)
    } else {
      toastUpdate(toastID)
    }
  }, [progress.loading])

  return (
    <div className="w-4/5 mx-auto mt-10">
      <h1 className="text-center text-2xl">
        Upload your CSV files from
        <span className="font-semibold ml-1">
          Airtable to Swell and Algolia
        </span>
      </h1>
      <p className="text-lg mt-4 text-center">
        For effective upload, Upload a maximum of 100 products at a time
      </p>
      <Dropzonebar progress={progress} style={style} dropzone={dropzone} />
    </div>
  )
}
