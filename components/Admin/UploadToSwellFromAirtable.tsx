import Dropzonebar from '@/components/Dropzonebar'
import useCSVDropzone from '@/hooks/useCSVDropzone'
import { uploadAirtableCSV } from '@/utils/uploadCSV'

export default function UploadToSwellFromAirtable() {
  const { progress, dropzone, style } = useCSVDropzone(uploadAirtableCSV)

  return (
    <div>
      <h1 className="text-center text-2xl">
        Upload your CSV files from
        <span className="font-semibold ml-1">Airtable to Swell</span>
      </h1>
      <p className="text-lg mt-4">
        For effective upload, Upload a maximum of 100 products at a time
      </p>
      <Dropzonebar progress={progress} style={style} dropzone={dropzone} />
    </div>
  )
}
