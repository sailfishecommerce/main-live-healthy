/* eslint-disable no-nested-ternary */
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'

import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import OrdersTable from '@/components/Table/OrdersTable'
import { useOrderInvoice } from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'
import getInvoiceproductIds from '@/lib/get-invoice-product-ids'

export default function Admin() {
  const { data, status } = useOrderInvoice()

  let orders
  let productsArray: any = null
  if (status === 'success') {
    const orderInvoiceArray = data?.data.invoiceArray
    productsArray = getInvoiceproductIds(orderInvoiceArray)

    orders = orderInvoiceArray.slice(0, 10)
  }

  useEffect(() => {
    axios.post('/api/get-invoice-products', { ordersIds: productsArray })
  }, [])

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
            <OrdersTable orders={orders} />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
