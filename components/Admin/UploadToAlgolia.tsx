import Dropzonebar from '@/components/Dropzonebar'
import useCSVDropzone from '@/hooks/useCsvDropzone'
import uploadCSV from '@/utils/uploadCSV'

export default function UploadToAlgolia() {
  const { dropzone, progress, style } = useCSVDropzone(
    '/api/upload-csv-to-algolia',
    uploadCSV
  )

  return (
    <div>
      <h1 className="text-center text-2xl">
        Upload your CSV files to
        <span className="font-semibold ml-1">Algolia Livehealthy record</span>
      </h1>
      <Dropzonebar progress={progress} style={style} dropzone={dropzone} />
    </div>
  )
}
