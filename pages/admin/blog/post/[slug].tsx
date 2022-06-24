import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function BlogPostPage() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        {/* <DynamicDashboardEditor editorKey={route} /> */}
      </DashboardMainView>
    </DashboardLayout>
  )
}
