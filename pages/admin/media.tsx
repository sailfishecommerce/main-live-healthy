import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function media() {
  return (
    <DashboardLayout title="Upload Media page">
      <DashboardMainView>
        <h4 className="text-center font-bold text-xl">
          Upload Images, copy image link to your blog post and about-us page
        </h4>
      </DashboardMainView>
    </DashboardLayout>
  )
}
