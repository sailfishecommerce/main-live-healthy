import { PDFViewer } from '@react-pdf/renderer'
// import { createRef } from 'react'
// import { BiDownload } from 'react-icons/bi'
// import ReactToPdf from 'react-to-pdf'

// import InvoicePage from '@/components/Invoice/InvoicePage'

import InvoicePdf from './InvoicePdf'

export default function Invoice({ invoice }: any) {
  // const ref = createRef()
  return (
    <>
      {/* <ReactToPdf targetRef={ref} filename={`invoice-${invoice.number}`}>
        {({ toPdf }: any) => (
          <button
            type="button"
            className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
            onClick={toPdf}
          >
            <BiDownload className="mr-2" size={24} />
            Download
          </button>
        )}
      </ReactToPdf> */}

      {/* <InvoicePage pageRef={ref} invoice={invoice} /> */}
      <PDFViewer width="100%" height="100%">
        <InvoicePdf invoice={invoice} />
      </PDFViewer>
    </>
  )
}
