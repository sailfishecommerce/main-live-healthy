/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router'

export default function InvoiceTableBody({ tableInstance }: any) {
  const router = useRouter()

  const { getTableBodyProps, page, prepareRow } = tableInstance

  function viewInvoice(id: string) {
    const routeId = id?.includes('#') ? id.split('#')[1] : id
    router.push(`/admin/invoice/${routeId}`)
  }

  return (
    <>
      <tbody {...getTableBodyProps()}>
        {page.map((row: any, index: number) => {
          prepareRow(row)
          const rowOrderId = row.original.orderNumber
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell: any, i: number) => {
                const validCell =
                  cell.value !== undefined
                    ? () => viewInvoice(rowOrderId)
                    : null
                return (
                  <td key={i} {...cell.getCellProps()} onClick={validCell}>
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
        tbody tr {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
