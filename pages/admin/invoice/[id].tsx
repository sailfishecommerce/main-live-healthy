/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Invoice from '@/components/Invoice'
import useAdminOrder from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'
import { SearchPageLayout } from '@/layouts/search-page-layout'

export default function InvoicePage(props: any) {
  const router = useRouter()
  const { data, status } = useAdminOrder()

  let invoice
  if (status === 'success') {
    invoice = data.data.results.filter(
      (invoiceData: { id: any }) => invoiceData.id === router.query.id
    )
  }

  return (
    <SearchPageLayout {...props}>
      <DashboardLayout title="Invoice page">
        <DashboardMainView>
          {status === 'error'
            ? 'unable to fetch page data'
            : status === 'loading'
            ? 'loading ...'
            : invoice[0] && <Invoice invoice={invoice[0]} />}
        </DashboardMainView>
      </DashboardLayout>
    </SearchPageLayout>
  )
}
