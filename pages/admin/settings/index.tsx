import SplittedView from '@/components/Admin/SplittedView'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import settingsList from '@/json/settings.json'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <DashboardMainView>
        <SplittedView
          defaultView="create-admin-profile"
          viewList={settingsList}
          title="Settings"
        />
      </DashboardMainView>
    </DashboardLayout>
  )
}
