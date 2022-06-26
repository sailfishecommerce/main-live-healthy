/* eslint-disable react/no-array-index-key */
import { useTable } from 'react-table'

export default function BlogTable({ columns, data }: any) {
  const { getTableProps, headerGroups, rows, prepareRow, getTableBodyProps } =
    useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    })

  return (
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
        {rows.map((row: any, i: number) => {
          prepareRow(row)
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell: any, index: number) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render('Cell')}
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
