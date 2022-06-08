/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Invoice from '@/components/Invoice'
import AirwallexInvoice from '@/components/Invoice/AirwallexInvoice'
import { useOrderInvoice } from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'
import { SearchPageLayout } from '@/layouts/search-page-layout'
import { airwallexAdminPaymentAtom } from '@/lib/atomConfig'

export default function InvoicePage(props: any) {
  const router = useRouter()
  const { data, status } = useOrderInvoice()
  const [airwallexAdminPayment] = useAtom(airwallexAdminPaymentAtom)

  let invoice
  let airwallexInvoice
  if (status === 'success') {
    const airwallexPaymentData = airwallexAdminPayment.filter(
      (airwallexData: any) => airwallexData.id === router.query.id
    )

    const stripePaymentData = data.data.invoiceArray.filter(
      (invoiceData: { id: any }) => invoiceData.id === router.query.id
    )
    if (airwallexPaymentData) {
      airwallexInvoice = airwallexPaymentData
    } else {
      invoice = stripePaymentData
    }
  }

  console.log('invoice[0]', invoice)
  console.log('airwallexInvoice[0]', airwallexInvoice)

  return (
    <SearchPageLayout {...props}>
      <DashboardLayout title="Invoice page">
        <DashboardMainView>
          {status === 'error' ? (
            'unable to fetch page data'
          ) : status === 'loading' ? (
            'loading ...'
          ) : invoice !== undefined ? (
            <Invoice invoice={invoice[0]} />
          ) : (
            <AirwallexInvoice invoice={airwallexInvoice[0]} />
          )}
        </DashboardMainView>
      </DashboardLayout>
    </SearchPageLayout>
  )
}
