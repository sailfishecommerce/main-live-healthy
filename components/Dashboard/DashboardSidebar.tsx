import DashboardLinks from '@/components/Dashboard/DashboardLinks'
import Logo from '@/components/Logo'

export default function DashboardSidebar() {
  return (
    <div className="flex flex-col">
      <Logo className="w-1/5" />
      <DashboardLinks />
    </div>
  )
}
