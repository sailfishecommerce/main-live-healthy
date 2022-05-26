import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { BiDownload } from 'react-icons/bi'

import InvoicePage from '@/components/Invoice/InvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export default function Invoice({ invoice }: any) {
  return (
    <>
      <PDFDownloadLink
        document={<InvoicePdf invoice={invoice} />}
        fileName={`invoice-${invoice.number}`}
      >
        <button
          type="button"
          className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
        >
          <BiDownload className="mr-2" size={24} />
          Download
        </button>
      </PDFDownloadLink>

      <InvoicePage invoice={invoice} />
      <PDFViewer width="100%" height="100%">
        <InvoicePdf invoice={invoice} />
      </PDFViewer>
    </>
  )
}
