/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table'

import InvoicePagination from '@/components/Table/InvoicePagination'
import InvoiceTableCheckbox from '@/components/Table/InvoiceTableCheckbox'
import useAirwallexAdmin from '@/hooks/useAirwallexAdmin'
import formatTable from '@/utils/formatTable'

interface InvoiceTableProps {
  stripeData: []
}

export default function InvoiceTable({ stripeData }: InvoiceTableProps) {
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
    }
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance

  return (
    <>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, indexN: number) => (
                <th
                  key={indexN}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span className="ml-2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortAmountDownAlt />
                      ) : (
                        <FaSortAmountUp />
                      )
                    ) : (
                      <BiSortAlt2 />
                    )}
                  </span>
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
        .table tr th:first-child span {
          display: none;
        }
        .table tr th {
          display: table-cell;
          position: relative;
        }
        .table tr th span {
          margin: 0;
          position: absolute;
          top: 14px;
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}
