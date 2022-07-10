import dynamic from 'next/dynamic'

import DownloadInvoice from '@/components/Invoice/DownloadInvoice'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

const DynamicInvoicePage = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InvoicePage' */ '@/components/Invoice/InvoicePage'
    )
)

export default function Invoice({ invoice }: any) {
  return (
    <>
      {invoice && (
        <DownloadInvoice
          invoice={invoice}
          type="stripe"
          invoicePdf={<InvoicePdf invoice={invoice} />}
        />
      )}
      {invoice && <DynamicInvoicePage invoice={invoice} />}
    </>
  )
}
