import DownloadInvoice from '@/components/Invoice/DownloadInvoice'
import InvoicePage from '@/components/Invoice/InvoicePage'
import InvoicePdf from '@/components/Invoice/InvoicePdf'

export default function Invoice({ invoice }: any) {
  return (
    <>
      <DownloadInvoice
        invoice={invoice}
        invoicePdf={<InvoicePdf invoice={invoice} />}
      />
      {invoice && <InvoicePage invoice={invoice} />}
    </>
  )
}
