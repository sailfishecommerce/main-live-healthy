/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useOrderInvoice } from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'
import { SearchPageLayout } from '@/layouts/search-page-layout'
import { airwallexAdminPaymentAtom } from '@/lib/atomConfig'

const DynamicAirwallexInvoice = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AirwallexInvoice' */ '@/components/Invoice/AirwallexInvoice'
    )
)

const DynamicInvoice = dynamic(
  () => import(/* webpackChunkName: 'Invoice' */ '@/components/Invoice')
)

export default function InvoicePage(props: any) {
  const router = useRouter()
  const { data, status } = useOrderInvoice()
  const [airwallexAdminPayment] = useAtom(airwallexAdminPaymentAtom)

  let invoice
  let airwallexInvoice
  if (status === 'success') {
    const airwallexPaymentData = airwallexAdminPayment.filter(
      (airwallexData: { id: string }) => airwallexData.id === router.query.id
    )

    const stripePaymentData = data.data.invoiceArray.filter(
      (invoiceData: { number: string }) => {
        return invoiceData.number === `#${router.query.id}`
      }
    )

    if (airwallexPaymentData.length > 0) {
      airwallexInvoice = airwallexPaymentData
    } else {
      invoice = stripePaymentData
    }
  }

  return (
    <SearchPageLayout {...props}>
      <DashboardLayout title="Invoice page">
        <DashboardMainView>
          {status === 'error' ? (
            'unable to fetch page data'
          ) : status === 'loading' ? (
            <SpinnerRipple centerRipple />
          ) : invoice !== undefined ? (
            <DynamicInvoice invoice={invoice[0]} />
          ) : (
            <DynamicAirwallexInvoice invoice={airwallexInvoice[0]} />
          )}
        </DashboardMainView>
      </DashboardLayout>
    </SearchPageLayout>
  )
}
