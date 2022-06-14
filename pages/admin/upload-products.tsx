import dynamic from 'next/dynamic'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

const DynamicUploadToSwellFromAirtable = dynamic(
  () =>
    import(
      /* webpackChunkName: 'UploadToSwellFromAirtable' */ '@/components/Admin/UploadToSwellFromAirtable'
    ),
  { ssr: false }
)

export default function UploadProducts() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <DynamicUploadToSwellFromAirtable />
      </DashboardMainView>
    </DashboardLayout>
  )
}
