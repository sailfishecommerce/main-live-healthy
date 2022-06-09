import SplittedView from '@/components/Admin/SplittedView'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

const uploadContentArray = [
  { text: 'Upload products to Swell', viewId: 'uploadToSWell' },
  { text: 'Upload products to Algolia', viewId: 'uploadToAlgolia' },
]

export default function UploadProducts() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <SplittedView
          defaultView="create-admin-profile"
          viewList={uploadContentArray}
          title="Upload"
        />
      </DashboardMainView>
    </DashboardLayout>
  )
}
