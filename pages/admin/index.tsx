import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Admin() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <DashboardCard />
        <div className="orders bg-white rounded-xl px-8 py-6 h-96">
          <h1 className="text-xl font-bold mt-">Orders</h1>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
