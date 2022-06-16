import { PDFDownloadLink } from '@react-pdf/renderer'
import { BiDownload } from 'react-icons/bi'

export default function DownloadInvoice({ invoice, invoicePdf, type }: any) {
  const pdfFileName = type === 'stripe' ? invoice?.number : invoice?.id
  return (
    <>
      <PDFDownloadLink
        document={invoicePdf}
        fileName={`invoice-${pdfFileName}.pdf`}
      >
        <button
          type="button"
          className="downloadbutton flex absolute right-0 top-0 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
        >
          <BiDownload className="mr-2" size={24} />
          Download
        </button>
      </PDFDownloadLink>
    </>
  )
}
