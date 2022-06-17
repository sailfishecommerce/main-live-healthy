/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table'

import InvoiceTableCheckbox from '@/components/Table/InvoiceTableCheckbox'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import formatTable from '@/utils/formatTable'

export default function useAdminInvoice(stripeData: [], selectRow: boolean) {
  const { airwallexPayments } = useAirwallexAdmin()

  const stripeInvoiceData = useMemo(() => {
    let stripeDataArray = []
    stripeDataArray = formatTable(stripeData)
    return stripeDataArray
  }, [])

  const airwallexInvoiceData = useMemo(() => {
    const airwallexDataArray = [...formatTable(airwallexPayments).reverse()]
    return airwallexDataArray
  }, [])

  const data = useMemo(
    () => [...airwallexInvoiceData, ...stripeInvoiceData],
    []
  )

  const columns = useMemo(
    () => [
      { Header: 'ORDER', accessor: 'orderNumber' },
      { Header: 'DATE', accessor: 'dateCreated' },
      { Header: 'CUSTOMER', accessor: 'customerName' },
      { Header: 'PAYMENT', accessor: 'payment' },
      { Header: 'FULFULLMENT', accessor: 'orderFulfillment' },
      { Header: 'TOTAL', accessor: 'orderTotal' },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      return (
        selectRow &&
        hooks.visibleColumns.push((columnItem: any) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <InvoiceTableCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: any) => (
              <div>
                <InvoiceTableCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columnItem,
        ])
      )
    }
  )

  return { tableInstance }
}
