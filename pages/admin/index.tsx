/* eslint-disable no-nested-ternary */
import Link from 'next/link'

import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import OrdersTable from '@/components/Table/OrdersTable'
import { useOrderInvoice } from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Admin() {
  const { data, status } = useOrderInvoice()

  let orders
  if (status === 'success') {
    const orderInvoiceArray = data?.data.invoiceArray

    orders = orderInvoiceArray.slice(0, 10)
  }

  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <DashboardCard />
        <div className="orders bg-white rounded-xl px-8 py-6">
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
            'loading ...'
          ) : (
            <OrdersTable orders={orders} showInput={false} />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
