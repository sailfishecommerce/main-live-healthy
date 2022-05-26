/* eslint-disable no-nested-ternary */
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import OrdersTable from '@/components/Table/OrdersTable'
import useAdminOrder from '@/hooks/useAdminOrder'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function InvoicePage() {
  const { data, status } = useAdminOrder()
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <h1 className="lg:text-3xl text-xl">Livehealthy Order Invoices</h1>
          {status === 'error' ? (
            'unable to fetch orders'
          ) : status === 'loading' ? (
            <SpinnerRipple centerRipple />
          ) : (
            <OrdersTable orders={data?.data?.results} />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
