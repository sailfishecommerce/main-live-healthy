import { PDFDownloadLink } from '@react-pdf/renderer'
import { BiDownload } from 'react-icons/bi'

import AirwallexInvoicePage from '@/components/Invoice/AirwallexInvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export function DownloadButton({ invoice }: any) {
  return (
    <PDFDownloadLink
      document={<InvoicePdf invoice={invoice} />}
      fileName={`invoice-${invoice.number}.pdf`}
    >
      <button
        type="button"
        className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
      >
        <BiDownload className="mr-2" size={24} />
        Download
      </button>
    </PDFDownloadLink>
  )
}

export default function AirwallexInvoice({ invoice }: any) {
  return (
    <>
      {/* <DownloadButton invoice={invoice} /> */}
      <AirwallexInvoicePage invoice={invoice} />
    </>
  )
}
