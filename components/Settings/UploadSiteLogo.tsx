import Dropzonebar from '@/components/Dropzonebar'
import useLogoUpload from '@/hooks/useLogoUpload'

export default function UploadSiteLogo() {
  const { dropzone, style, isUploadSuccessful } = useLogoUpload()

  return (
    <div>
      <h4 className="text-center font-bold text-xl">Upload Site Logo</h4>

      <Dropzonebar
        style={style}
        dropzone={dropzone}
        fileType="image"
        uploadStatus={isUploadSuccessful}
      />
    </div>
  )
}
