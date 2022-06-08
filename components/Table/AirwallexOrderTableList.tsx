/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from 'next/router'

import useInvoiceTable from '@/hooks/useInvoiceTable'
import { formatOrderDate } from '@/lib/formatOrderDate'
import { formatPrice } from '@/lib/formatPrice'

export default function AirwallexOrderTableList({
  airwallexData,
  index,
  showInput,
}: any) {
  const router = useRouter()
  const indexNumber = index + 1

  function viewInvoice(id: any | string) {
    router.push(`/admin/invoice/${id}`)
  }

  const paymentType = airwallexData.status === 'SUCCEEDED' ? 'Paid' : 'Unpaid'
  const orderFulfillment = '-'
  const currency =
    airwallexData.currency === 'HKD' ? 'HK $' : airwallexData.currency

  const customerName = `${airwallexData.order.shipping.first_name} ${airwallexData.order.shipping.last_name}`
  const { selectedInvoice, updateSelectedIndex } = useInvoiceTable()

  const inputChecked = selectedInvoice.selected.includes(airwallexData.id)

  return (
    <>
      <tr key={airwallexData.id} className="bg-white row p-4">
        {showInput && (
          <td>
            <input
              checked={inputChecked}
              type="checkbox"
              onChange={() => updateSelectedIndex(airwallexData.id)}
            />
          </td>
        )}
        <td onClick={() => viewInvoice(airwallexData.id)}>{indexNumber}</td>
        <td onClick={() => viewInvoice(airwallexData.id)}>
          {airwallexData.id}
        </td>
        <td onClick={() => viewInvoice(airwallexData.id)}>
          {formatOrderDate(airwallexData.created_at)}
        </td>
        <td onClick={() => viewInvoice(airwallexData.id)}>{customerName}</td>
        <td onClick={() => viewInvoice(airwallexData.id)}>{paymentType}</td>
        <td onClick={() => viewInvoice(airwallexData.id)}>
          {orderFulfillment}
        </td>
        <td
          onClick={() => viewInvoice(airwallexData.id)}
        >{`${currency} ${formatPrice(airwallexData.amount)}`}</td>
      </tr>
      <style jsx>
        {`
          tr.bg-white.row {
            position: relative;
            z-index: 10;
          }
          .checkbox-form input {
            position: absolute;
            z-index: 20;
            left: 10;
          }

          .row {
            width: 100%;
            border-bottom: 1px solid #e5e5e6;
            height: 50px;
            padding: 11px 16px;
            cursor: pointer;
          }
          .row td {
            text-align: center;
          }
          .row.bg-white:hover {
            background-color: lightgray;
          }
        `}
      </style>
    </>
  )
}
