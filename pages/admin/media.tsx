import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Dropzonebar from '@/components/Dropzonebar'
import useMediaUpload from '@/hooks/useMediaUpload'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Media() {
  const { dropzone, style } = useMediaUpload()

  return (
    <DashboardLayout title="Upload Media page">
      <DashboardMainView>
        <h4 className="text-center font-bold text-xl">
          Upload Images, copy image link to your blog post and about-us page
        </h4>
        <div className="content mt-6 flex">
          <div className="w-2/6 ">
            <Dropzonebar style={style} dropzone={dropzone} fileType="images" />
          </div>
          <div className="w-4/6 ml-8  border-l-2 pl-8 h-screen">
            <h6 className="text-center font-medium text-lg">
              No media uploaded yet
            </h6>
          </div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
