import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { BiDownload } from 'react-icons/bi'

import InvoicePage from '@/components/Invoice/InvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export function DownloadButton({ invoice }: any) {
  return (
    <button
      type="button"
      className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
      onClick={async () => {
        const doc = <InvoicePdf invoice={invoice} />
        const asPdf = pdf([]) // {} is important, throws without an argument
        asPdf.updateContainer([doc, doc, doc])
        const blob = await asPdf.toBlob()
        saveAs(blob, `invoice-${invoice.number}`)
      }}
    >
      <BiDownload className="mr-2" size={24} />
      Download
    </button>
  )
}

export default function Invoice({ invoice }: any) {
  return (
    <>
      <PDFDownloadLink
        document={<InvoicePdf invoice={invoice} />}
        fileName={`invoice-${invoice.number}`}
      >
        <DownloadButton />
      </PDFDownloadLink>
      <InvoicePage invoice={invoice} />
    </>
  )
}
