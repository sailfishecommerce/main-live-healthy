import { PDFDownloadLink } from '@react-pdf/renderer'
import { BiDownload } from 'react-icons/bi'

import InvoicePage from '@/components/Invoice/InvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export function DownloadButton({ invoice }: any) {
  return (
    <>
      <PDFDownloadLink
        document={<InvoicePdf invoice={invoice} />}
        fileName={`invoice-${invoice.number}.pdf`}
      >
        <button
          type="button"
          className="downloadbutton flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
        >
          <BiDownload className="mr-2" size={24} />
          Download
        </button>
      </PDFDownloadLink>
      <style jsx>{`
        .downloadbutton {
          float: right;
          clear: both;
        }
      `}</style>
    </>
  )
}

export default function Invoice({ invoice }: any) {
  return (
    <>
      {invoice && <DownloadButton invoice={invoice} />}

      {invoice && <InvoicePage invoice={invoice} />}
    </>
  )
}
