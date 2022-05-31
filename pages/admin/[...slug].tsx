import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

const DynamicDashboardEditor = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DynamicDashboardEditor' */ '@/components/Dashboard/DashboardEditor'
    ),
  {
    ssr: false,
  }
)

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
          <DynamicDashboardEditor />
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
