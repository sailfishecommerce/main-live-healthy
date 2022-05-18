import { useRouter } from 'next/router'

import DashboardEditor from '@/components/Dashboard/DashboardEditor'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function AdminPage() {
  const router = useRouter()
  const route = router.asPath.split('/admin/')[1]
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <h1 className="text-xl">
            {route.toUpperCase().replaceAll('-', ' ')}
          </h1>
          <DashboardEditor />
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
export function getServerSideProps() {
  return {
    props: {},
  }
}
