/* eslint-disable react/no-array-index-key */

export default function InvoiceTableBody({ tableInstance }: any) {
  const { getTableBodyProps, page, prepareRow } = tableInstance
  return (
    <>
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
      <style jsx>{`
        tbody td {
          border: 1px solid #e5e5e6;
          text-align: center;
          padding: 10px;
        }
      `}</style>
    </>
  )
}
