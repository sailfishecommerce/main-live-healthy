/* eslint-disable array-callback-return */
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { useAtom } from 'jotai'
import JSZip from 'jszip'

import InvoicePdf from '@/components/Invoice/InvoicePdf'
import useInvoiceTable from '@/hooks/useInvoiceTable'
import { loadingInvoiceAtom } from '@/lib/atomConfig'

export default function useMulipleInvoiceDownload() {
  const { selectedInvoice } = useInvoiceTable()
  const [, setLoading] = useAtom(loadingInvoiceAtom)
  const { selected } = selectedInvoice

  function invoiceMultipleDownload() {
    setLoading(true)
    axios
      .get('/api/get-all-invoice')
      .then((response) => {
        return response.data.invoiceArray
      })
      .then((response) => {
        const selectedInvoiceDataArray: any[] = []
        selected.map((sI) => {
          const invoiceDataArray = response.filter(
            (inv: any) => inv.number === sI
          )
          selectedInvoiceDataArray.push(invoiceDataArray[0])
        })
        return selectedInvoiceDataArray
      })
      .then((response) => {
        const zip = new JSZip()
        response.map((invoiceData) => {
          zip.file(
            `invoice-${invoiceData.number}.pdf`,
            pdf(<InvoicePdf invoice={invoiceData} />).toBlob()
          )
        })
        setLoading(false)
        return zip.generateAsync({ type: 'blob' }).then((blob) => {
          saveAs(blob, 'invoice.zip')
        })
      })
  }

  return { invoiceMultipleDownload }
}
