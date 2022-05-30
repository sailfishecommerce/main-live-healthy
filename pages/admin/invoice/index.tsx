/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import { BiDownload } from 'react-icons/bi'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import InvoicePdf from '@/components/Invoice/InvoicePdf'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import OrdersTable from '@/components/Table/OrdersTable'
import useAdminOrder from '@/hooks/useAdminOrder'
import useInvoiceTable from '@/hooks/useInvoiceTable'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function InvoicePage() {
  const { data, status } = useAdminOrder()
  const [downloadInvoices, setDownloadInvoice] = useState(false)
  const { selectedInvoice } = useInvoiceTable()
  const [, setInvoice] = useState([])
  const selectedInvoiceCount = selectedInvoice.selected.length
  const { selected } = selectedInvoice

  const selectedInvoiceText =
    selectedInvoiceCount > 1
      ? `${selectedInvoiceCount} Invoices`
      : selectedInvoiceCount === 1
      ? `${selectedInvoiceCount} Invoice`
      : ''
  const disableButton = !(selectedInvoiceCount > 0)

  console.log('selected', selected)
  useEffect(() => {
    if (downloadInvoices) {
      axios
        .get('/api/get-all-invoice')
        .then((response) => {
          setInvoice(response.data?.invoiceArray)
          return response.data.invoiceArray
        })
        .then((response) => {
          console.log('response', response)
          console.log('selected', selected)
          const selectedInvoiceDataArray: any[] = []
          selected.map((sI) => {
            const invoiceDataArray = response.filter(
              (inv: any) => inv.number === sI
            )
            console.log('invoiceDataArray', invoiceDataArray)
            selectedInvoiceDataArray.push(invoiceDataArray[0])
          })
          return selectedInvoiceDataArray
        })
        .then((response) => {
          console.log('selectedInvoiceDataArray-response', response)
          const zip = new JSZip()
          response.map((invoiceData) => {
            zip.file(
              `invoice-${invoiceData.number}.pdf`,
              pdf(<InvoicePdf invoice={invoiceData} />).toBlob()
            )
          })
          setDownloadInvoice(false)
          return zip.generateAsync({ type: 'blob' }).then((blob) => {
            saveAs(blob, 'invoice.zip')
          })
        })
    }
  }, [downloadInvoices])

  console.log('downloadInvoices', downloadInvoices)

  function downloadHandler() {
    setDownloadInvoice(true)
  }

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
              onClick={downloadHandler}
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
