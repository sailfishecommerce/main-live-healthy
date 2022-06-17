/* eslint-disable array-callback-return */
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { useAtom } from 'jotai'
import JSZip from 'jszip'

import AirwallexInvoicePdf from '@/components/Invoice/AirwallexInvoicePdf'
import InvoicePdf from '@/components/Invoice/InvoicePdf'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import { loadingInvoiceAtom, paymentInvoiceAtom } from '@/lib/atomConfig'

export default function useMulipleInvoiceDownload() {
  const [paymentInvoice] = useAtom(paymentInvoiceAtom)
  const [, setLoading] = useAtom(loadingInvoiceAtom)
  const { airwallexPayments } = useAirwallexAdmin()

  function invoiceMultipleDownload() {
    setLoading(true)
    axios
      .get('/api/get-all-invoice')
      .then((response) => {
        const responseResult = response.data.invoiceArray
        const responseArray = [...airwallexPayments, ...responseResult]
        return responseArray
      })
      .then((response) => {
        const selectedInvoiceDataArray: any[] = []
        paymentInvoice.map((sI: string) => {
          const invoiceDataArray = response.filter((inv: any) => {
            return sI.includes('#2909-') ? inv.number === sI : inv.id === sI
          })
          selectedInvoiceDataArray.push(invoiceDataArray[0])
        })
        return selectedInvoiceDataArray
      })
      .then((response) => {
        const zip = new JSZip()
        response.map((invoiceData) => {
          const invoiceName = invoiceData?.number
            ? invoiceData.number
            : invoiceData.id

          const invoiceType = invoiceData?.number ? (
            <InvoicePdf invoice={invoiceData} />
          ) : (
            <AirwallexInvoicePdf invoice={invoiceData} />
          )
          zip.file(`invoice-${invoiceName}.pdf`, pdf(invoiceType).toBlob())
        })
        setLoading(false)
        return zip.generateAsync({ type: 'blob' }).then((blob) => {
          saveAs(blob, 'invoice.zip')
        })
      })
  }

  return { invoiceMultipleDownload }
}
