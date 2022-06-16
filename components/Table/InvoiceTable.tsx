/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import { useTable } from 'react-table'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useAdminOrder from '@/hooks/useAdminOrder'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import formatTable from '@/utils/formatTable'

export default function InvoiceTable() {
  const { airwallexPayments } = useAirwallexAdmin()
  const { data, status } = useAdminOrder()

  const stripeInvoiceData = useMemo(() => {
    let stripeDataArray = []
    if (status === 'success') {
      const result = data?.data.results
      stripeDataArray = formatTable(result)
    }
    return stripeDataArray
  }, [status])

  const airwallexInvoiceData = useMemo(() => {
    const airwallexDataArray = formatTable(airwallexPayments)
    return airwallexDataArray
  }, [])

  const invoiceData = useMemo(
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

  const tableInstance = useTable({ columns, data: invoiceData })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <>
      {status === 'error' ? (
        'unable to fetch orders'
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, indexN: number) => (
                  <th key={indexN} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index: number) => {
              prepareRow(row)
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td key={i} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}
