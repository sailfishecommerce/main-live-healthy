import DashboardEditor from '@/components/Dashboard/DashboardEditor'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function PrivacyPolicy() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <h1 className="text-2xl">Privacy Policy</h1>
          <DashboardEditor />
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
