import DashboardLinks from '@/components/Dashboard/DashboardLinks'
import Logo from '@/components/Logo'

export default function DashboardSidebar() {
  return (
    <div className="flex flex-col pl-12 pt-8">
      <Logo className="w-1/2" />
      <DashboardLinks />
    </div>
  )
}
