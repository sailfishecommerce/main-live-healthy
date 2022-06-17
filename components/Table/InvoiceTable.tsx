/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import InvoicePagination from '@/components/Table/InvoicePagination'
import useAdminOrder from '@/hooks/useAdminOrder'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import formatTable from '@/utils/formatTable'

export default function InvoiceTable() {
  const { airwallexPayments } = useAirwallexAdmin()
  const { data: adminDatat, status } = useAdminOrder()

  const stripeInvoiceData = useMemo(() => {
    let stripeDataArray = []
    if (status === 'success') {
      const result = adminDatat?.data.results
      stripeDataArray = formatTable(result)
    }
    return stripeDataArray
  }, [status])

  const airwallexInvoiceData = useMemo(() => {
    const airwallexDataArray = formatTable(airwallexPayments)
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
    usePagination
  )
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance

  return (
    <>
      {status === 'error' ? (
        'unable to fetch orders'
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : (
        <>
          <table className="table" {...getTableProps()}>
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
              {page.map((row: any, index: number) => {
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
          <InvoicePagination tableInstance={tableInstance} />
        </>
      )}
      <style jsx>{`
        .table,
        td,
        th {
          border: 1px solid #e5e5e6;
          text-align: center;
          padding: 10px;
        }
        .table {
          width: 100%;
          padding: 0px 10px;
          background-color: white;
        }
      `}</style>
    </>
  )
}
