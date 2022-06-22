import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Dropzonebar from '@/components/Dropzonebar'
import MediaView from '@/components/MediaImage/MediaView'
import useMediaUpload from '@/hooks/useMediaUpload'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Media() {
  const { dropzone, style, isUploadSuccessful } = useMediaUpload()

  return (
    <DashboardLayout title="Upload Media page">
      <DashboardMainView>
        <h4 className="text-center font-bold text-xl">
          Upload Images, copy image link to your blog post and about-us page
        </h4>
        <div className="content mt-6 flex">
          <div className="w-2/6 ">
            <Dropzonebar
              style={style}
              dropzone={dropzone}
              fileType="images"
              uploadStatus={isUploadSuccessful}
            />
          </div>
          <MediaView />
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
