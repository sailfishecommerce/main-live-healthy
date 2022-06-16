/* eslint-disable no-nested-ternary */
import Link from 'next/link'

import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import OrdersTable from '@/components/Table/OrdersTable'
import { useOrderInvoice } from '@/hooks/useAdminOrder'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Admin() {
  const { data, status } = useOrderInvoice()
  const { airwallexPayments } = useAirwallexAdmin()

  const maxAirwallexArrayLength =
    airwallexPayments.length > 10 ? 5 : airwallexPayments.length
  const reversedAirwallexArray = [...airwallexPayments].reverse()
  const maxAirwallexDataArray = reversedAirwallexArray.slice(
    0,
    maxAirwallexArrayLength
  )
  let orders
  if (status === 'success') {
    const orderInvoiceArray = data?.data.invoiceArray
    const ordersLength =
      airwallexPayments.length > 10 ? 5 : 10 - airwallexPayments.length
    orders = orderInvoiceArray.slice(0, ordersLength)
  }

  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <DashboardCard />
        <div className="orders bg-white rounded-xl px-8 py-6 mb-16">
          <div className="row flex items-center justify-between">
            <h1 className="text-xl font-bold mt-">Orders</h1>
            <Link passHref href="/admin/invoice">
              <button type="button" className="mountain-green font-bold">
                View All
              </button>
            </Link>
          </div>
          {status === 'error' ? (
            'unable to fetch orders'
          ) : status === 'loading' ? (
            <SpinnerRipple centerRipple />
          ) : (
            <OrdersTable
              orders={orders}
              showInput={false}
              airwallexDataArray={maxAirwallexDataArray}
            />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
