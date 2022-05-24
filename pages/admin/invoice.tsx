/* eslint-disable no-nested-ternary */
import axios from 'axios'
import { useQuery } from 'react-query'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import OrdersTable from '@/components/Table/OrdersTable'
import DashboardLayout from '@/layouts/dashboard-layout'

function getOrders() {
  return axios.get('/api/get-orders')
}

export default function InvoicePage() {
  const { data, status } = useQuery('getInvoice', getOrders)

  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <h1 className="text-3xl">Livehealthy Order Invoices</h1>
          {status === 'error' ? (
            'unable to fetch orders'
          ) : status === 'loading' ? (
            'loading ...'
          ) : (
            <OrdersTable orders={data?.data.results} />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
