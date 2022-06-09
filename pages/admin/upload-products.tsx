import SplittedView from '@/components/Admin/SplittedView'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

const uploadContentArray = [
  { text: 'Upload products to Swell', viewId: 'uploadToSwell' },
  { text: 'Upload products to Algolia', viewId: 'uploadToAlgolia' },
]

export default function UploadProducts() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <SplittedView
          defaultView="uploadToSwell"
          viewList={uploadContentArray}
          title="Upload"
        />
      </DashboardMainView>
    </DashboardLayout>
  )
}
