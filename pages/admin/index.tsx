/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'
import Link from 'next/link'

import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useAdminOrder from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'

const DynamicInvoiceTable = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InvoiceTable' */ '@/components/Table/InvoiceTable'
    )
)

export default function Admin() {
  const { data, status } = useAdminOrder()

  const dataResult = data?.data?.results
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <DashboardCard />
        <div className="orders bg-white rounded-xl px-8 py-6 mb-16">
          <div className="row flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Orders</h1>
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
            dataResult && (
              <DynamicInvoiceTable
                stripeData={dataResult}
                showPagination={false}
                selectRow={false}
              />
            )
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
