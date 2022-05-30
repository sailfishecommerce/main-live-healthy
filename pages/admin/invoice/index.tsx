/* eslint-disable no-nested-ternary */
import { BiDownload } from 'react-icons/bi'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import OrdersTable from '@/components/Table/OrdersTable'
import useAdminOrder from '@/hooks/useAdminOrder'
import useInvoiceTable from '@/hooks/useInvoiceTable'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function InvoicePage() {
  const { data, status } = useAdminOrder()
  const { selectedInvoice } = useInvoiceTable()
  const selectedInvoiceCount = selectedInvoice.selected.length
  const selectedInvoiceText =
    selectedInvoiceCount > 1
      ? `${selectedInvoiceCount} Invoices`
      : selectedInvoiceCount === 1
      ? `${selectedInvoiceCount} Invoice`
      : ''
  const disableButton = !(selectedInvoiceCount > 0)

  console.log('disableButton', disableButton)

  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <div className="policy mt-4">
          <div className="flex items-center justify-between my-4">
            <h1 className="lg:text-2xl my-0 py-0 text-xl">
              Livehealthy Order Invoices
            </h1>
            <button
              type="button"
              className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
              disabled={disableButton}
            >
              <BiDownload className="mr-2" size={24} />
              Download <span className="mx-1">{selectedInvoiceText}</span>
            </button>
          </div>
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
