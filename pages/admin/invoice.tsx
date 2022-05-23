import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function invoice() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <h1 className="text-3xl">Livehealthy Invoices</h1>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
