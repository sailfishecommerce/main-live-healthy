import AirwallexInvoicePage from '@/components/Invoice/AirwallexInvoicePage'
import AirwallexInvoicePdf from '@/components/Invoice/AirwallexInvoicePdf'
import DownloadInvoice from '@/components/Invoice/DownloadInvoice'

export default function AirwallexInvoice({ invoice }: any) {
  return (
    <>
      {invoice && (
        <DownloadInvoice
          invoice={invoice}
          type="airwallex"
          invoicePdf={<AirwallexInvoicePdf invoice={invoice} />}
        />
      )}
      {invoice && <AirwallexInvoicePage invoice={invoice} />}
    </>
  )
}
