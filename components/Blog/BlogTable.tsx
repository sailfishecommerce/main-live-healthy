/* eslint-disable react/no-array-index-key */
import Link from 'next/link'
import { useTable } from 'react-table'

import toSlug from '@/lib/toSlug'

export default function BlogTable({ columns, data }: any) {
  const { getTableProps, headerGroups, rows, prepareRow, getTableBodyProps } =
    useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    })

  return (
    <table className="border mt-10 bg-white p-4" {...getTableProps()}>
      <thead className="p-4">
        {headerGroups.map((headerGroup: any, index: number) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, indexN: number) => (
              <th
                key={indexN}
                className="py-4 border-b"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i: number) => {
          prepareRow(row)
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell: any, index: number) => {
                const titleSlug = toSlug(cell.row?.original?.title)
                return (
                  <td
                    key={index}
                    className="border-b py-4 text-center hover:bg-gray-100"
                    {...cell.getCellProps()}
                  >
                    <Link passHref href={`/admin/blog/post/${titleSlug}`}>
                      <a>{cell.render('Cell')}</a>
                    </Link>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
