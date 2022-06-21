import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function BlogPage() {
  return (
    <DashboardLayout title="Blog page">
      <DashboardMainView>index</DashboardMainView>
    </DashboardLayout>
  )
}
