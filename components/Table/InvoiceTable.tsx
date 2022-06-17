import InvoicePagination from '@/components/Table/InvoicePagination'
import useAdminInvoice from '@/hooks/useAdminInvoice'

import InvoiceTableBody from './InvoiceTableBody'
import InvoiceTableHead from './InvoiceTableHead'

interface InvoiceTableProps {
  stripeData: []
}

export default function InvoiceTable({ stripeData }: InvoiceTableProps) {
  const { tableInstance } = useAdminInvoice(stripeData)

  const {
    getTableProps,
    headerGroups,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance

  console.log('selectedFlatRows', selectedFlatRows)

  return (
    <>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <table className="table" {...getTableProps()}>
        <InvoiceTableHead headerGroups={headerGroups} />
        <InvoiceTableBody tableInstance={tableInstance} />
      </table>
      <InvoicePagination tableInstance={tableInstance} />
      <style jsx>{`
        .table {
          width: 100%;
          padding: 0px 10px;
          background-color: white;
        }
      `}</style>
    </>
  )
}
