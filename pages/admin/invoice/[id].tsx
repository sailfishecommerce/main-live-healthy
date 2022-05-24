/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import useAdminOrder from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function InvoicePage() {
  const router = useRouter()
  const { data, status } = useAdminOrder()

  let invoice
  if (status === 'success') {
    invoice = data.data.results.filter(
      (invoiceData: { id: any }) => invoiceData.id === router.query.id
    )
  }
  return (
    <DashboardLayout title="Invoice page">
      <DashboardMainView>
        {status === 'error'
          ? 'unable to fetch page data'
          : status === 'loading'
          ? 'loading ...'
          : invoice[0]?.billing?.name}
      </DashboardMainView>
    </DashboardLayout>
  )
}
