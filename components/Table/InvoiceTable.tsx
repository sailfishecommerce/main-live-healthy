/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

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
          <div className="pagination">
            <button
              type="button"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              {'<<'}
            </button>{' '}
            <button
              type="button"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              {'<'}
            </button>{' '}
            <button
              type="button"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              {'>'}
            </button>{' '}
            <button
              type="button"
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              {'>>'}
            </button>{' '}
            <span className="ml-4">
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                style={{ width: '100px' }}
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageVal = e.target.value
                    ? Number(e.target.value) - 1
                    : 0
                  gotoPage(pageVal)
                }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSizeVal) => (
                <option key={pageSizeVal} value={pageSizeVal}>
                  Show {pageSizeVal}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <style jsx>{`
        .pagination button {
          border: 1px solid black;
          padding: 2px 5px;
          margin: 0px 5px;
        }
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
        .pagination {
          margin: 30px 0px;
        }
      `}</style>
    </>
  )
}
