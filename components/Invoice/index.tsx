import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { BiDownload } from 'react-icons/bi'

import InvoicePage from '@/components/Invoice/InvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export function DownloadButton({ invoice }: any) {
  function toZip() {
    const zip = new JSZip()
    zip.file(
      `invoice-${invoice.number}.pdf`,
      pdf(<InvoicePdf invoice={invoice} />).toBlob()
    )
    return zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'invoice.zip')
    })
  }

  return (
    <button
      type="button"
      className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
      onClick={toZip}
    >
      <BiDownload className="mr-2" size={24} />
      Download
    </button>
  )
}

export default function Invoice({ invoice }: any) {
  return (
    <>
      <DownloadButton invoice={invoice} />
      <InvoicePage invoice={invoice} />
    </>
  )
}
