/* eslint-disable react/no-array-index-key */
import Link from 'next/link'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useTable } from 'react-table'

import firebaseDatabase from '@/lib/firebaseDatabase'
import toSlug from '@/lib/toSlug'

export default function BlogTable({ columns, data }: any) {
  const { getTableProps, headerGroups, rows, prepareRow, getTableBodyProps } =
    useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    })

  function deletePost(dbNode: string) {
    const { deleteItemFromDB } = firebaseDatabase()
    deleteItemFromDB(dbNode)
  }

  return (
    <table className="border mt-10 bg-white p-4" {...getTableProps()}>
      <thead className="p-4">
        {headerGroups.map((headerGroup: any, index: number) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            <th className="py-4 border-b">S/N</th>
            {headerGroup.headers.map((column: any, indexN: number) => (
              <th
                key={indexN}
                className="py-4 border-b"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
            <th className="border-b py-4 text-center hover:bg-gray-100">
              <button className="font-bold" type="button">
                DELETE
              </button>
            </th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i: number) => {
          prepareRow(row)
          const rowTitle = toSlug(row.original.title)
          return (
            <tr key={i} {...row.getRowProps()}>
              <td className="border-b py-4 text-center hover:bg-gray-100">
                {i + 1}
              </td>
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
              <td className="border-b py-4 text-center hover:bg-gray-100">
                <button
                  type="button"
                  onClick={() => deletePost(`articles/blog/post/${rowTitle}`)}
                >
                  <RiDeleteBinLine className="hover:text-red-500" size={20} />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
