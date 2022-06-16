import AirwallexInvoicePage from '@/components/Invoice/AirwallexInvoicePage'
import AirwallexInvoicePdf from '@/components/Invoice/AirwallexInvoicePdf'
import DownloadInvoice from '@/components/Invoice/DownloadInvoice'

export default function AirwallexInvoice({ invoice }: any) {
  return (
    <>
      <DownloadInvoice
        invoice={invoice}
        invoicePdf={<AirwallexInvoicePdf invoice={invoice} />}
      />
      {invoice && <AirwallexInvoicePage invoice={invoice} />}
    </>
  )
}
