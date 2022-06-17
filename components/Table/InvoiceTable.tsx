/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import InvoicePagination from '@/components/Table/InvoicePagination'
import InvoiceTableBody from '@/components/Table/InvoiceTableBody'
import InvoiceTableHead from '@/components/Table/InvoiceTableHead'
import useAdminInvoice from '@/hooks/useAdminInvoice'
import { paymentInvoiceAtom } from '@/lib/atomConfig'

interface InvoiceTableProps {
  stripeData: []
}

export default function InvoiceTable({ stripeData }: InvoiceTableProps) {
  const { tableInstance } = useAdminInvoice(stripeData)
  const [, setPaymentInvoice] = useAtom(paymentInvoiceAtom)

  const {
    getTableProps,
    headerGroups,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance

  const selectedIds: any = []

  useEffect(() => {
    selectedFlatRows.map((selectedFlatRow: any) =>
      selectedIds.push(selectedFlatRow.values.orderNumber)
    )
    setPaymentInvoice(selectedIds)
  }, [selectedRowIds])

  return (
    <>
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
