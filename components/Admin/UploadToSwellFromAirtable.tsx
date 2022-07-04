/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

import Dropzonebar from '@/components/Dropzonebar'
import useCSVDropzone from '@/hooks/useCsvDropzone'
import useToast from '@/hooks/useToast'
import uploadCSV from '@/utils/uploadCSV'

export default function UploadToSwellFromAirtable() {
  const { progress, dropzone, style, isUploadSuccessful } =
    useCSVDropzone(uploadCSV)
  const { loadingToast, updateToast } = useToast()
  const toastID = useRef(null)

  useEffect(() => {
    if (progress.loading) {
      loadingToast(toastID)
    } else if (progress.uploaded > 0) {
      updateToast(toastID)
    }
  }, [progress.loading])

  useEffect(() => {
    toast.error(progress.error)
    if (progress.uploaded > 0) {
      toast.success(`${progress.uploaded} products uploaded`)
    }
  }, [progress.error])

  return (
    <div className="w-4/5 mx-auto mt-10">
      <h1 className="text-center text-2xl">
        Upload your CSV files from
        <span className="font-semibold ml-1">
          Airtable to Swell and Algolia at once
        </span>
      </h1>
      <p className="text-lg mt-4 text-center">
        For effective upload, Upload a maximum of 100 products at a time
      </p>
      <Dropzonebar
        progress={progress}
        style={style}
        dropzone={dropzone}
        fileType="csv"
        uploadStatus={isUploadSuccessful}
      />
    </div>
  )
}
