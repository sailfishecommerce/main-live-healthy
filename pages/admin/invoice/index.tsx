/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { BiDownload } from 'react-icons/bi'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import OrdersTable from '@/components/Table/OrdersTable'
import useAdminOrder from '@/hooks/useAdminOrder'
import useInvoiceTable from '@/hooks/useInvoiceTable'
import useMulipleInvoiceDownload from '@/hooks/useMulipleInvoiceDownload'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseConfig from '@/lib/firebaseConfig'

export default function InvoicePage() {
  const { data, status } = useAdminOrder()
  const [downloadInvoices, setDownloadInvoice] = useState(false)
  const { selectedInvoice } = useInvoiceTable()
  const selectedInvoiceCount = selectedInvoice.selected.length
  const { invoiceMultipleDownload } = useMulipleInvoiceDownload()
  const [airwallexPayments, setAirwallexPayments] = useState<any[]>([])

  const selectedInvoiceText =
    selectedInvoiceCount > 1
      ? `${selectedInvoiceCount} Invoices`
      : selectedInvoiceCount === 1
      ? `${selectedInvoiceCount} Invoice`
      : ''
  const disableButton = !(selectedInvoiceCount > 0)

  useEffect(() => {
    if (downloadInvoices) {
      invoiceMultipleDownload()
      setDownloadInvoice(false)
    }
  }, [downloadInvoices])

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)
    const dbRefId = 'payment/airwallex'
    const dbRef = ref(db, dbRefId)
    onValue(dbRef, (snapshot) => {
      const snapshopData = snapshot.val()
      const snapshotDataArray = Object.values(snapshopData)
      const snapshotArray: any = []
      snapshotDataArray.map((snapshotData: any) =>
        snapshotArray.push(JSON.parse(snapshotData))
      )
      setAirwallexPayments(snapshotArray)
    })
  }, [])

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
            <OrdersTable
              orders={data?.data?.results}
              airwallexDataArray={airwallexPayments}
            />
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
