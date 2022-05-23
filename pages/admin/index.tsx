import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'
import { adminAuthAtom } from '@/lib/atomConfig'

export default function Admin() {
  const [adminAuth] = useAtom(adminAuthAtom)
  const router = useRouter()

  useEffect(() => {
    if (adminAuth === null) {
      router.push('/admin/login')
    }
  }, [])

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
