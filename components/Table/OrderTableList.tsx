/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import { selectedInvoiceAtom } from '@/lib/atomConfig'
import { formatOrderDate } from '@/lib/formatOrderDate'
import { formatPrice } from '@/lib/formatPrice'

interface OrderTableListProps {
  order: {
    id: number
    billing: {
      name: string
    }
    paid: boolean
    number: number
    delivered: boolean
    currency: string
    shipping: {
      name: string
    }
    payment_total: number
    date_created: string
  }
  index: number
}

export default function OrderTableList({ order, index }: OrderTableListProps) {
  const [selectedInvoice, setSelectedInvoice] = useAtom(selectedInvoiceAtom)
  const router = useRouter()

  function updateSelectedAtom() {
    setSelectedInvoice(!selectedInvoice)
  }

  function viewInvoice(id: any | string) {
    router.push(`/admin/invoice/${id}`)
  }

  const orderNumber = index + 1
  let customerName = order.billing.name || order.shipping.name
  if (order.billing.name?.includes('undefined')) {
    customerName = '- -'
  }
  const paymentType = order.paid ? 'Paid' : 'Unpaid'
  const orderFulfillment = order.delivered ? 'Fulfilled' : 'Unfulfilled'
  const currency = order.currency === 'HKD' ? 'HK $' : order.currency
  return (
    <>
      <tr key={order.id} className="bg-white row p-4">
        <td>
          <input
            checked={selectedInvoice}
            type="checkbox"
            onChange={updateSelectedAtom}
          />
        </td>
        <td onClick={() => viewInvoice(order.id)}>{orderNumber}</td>
        <td onClick={() => viewInvoice(order.id)}>{order.number}</td>
        <td onClick={() => viewInvoice(order.id)}>
          {formatOrderDate(order.date_created)}
        </td>
        <td onClick={() => viewInvoice(order.id)}>{customerName}</td>
        <td onClick={() => viewInvoice(order.id)}>{paymentType}</td>
        <td onClick={() => viewInvoice(order.id)}>{orderFulfillment}</td>
        <td onClick={() => viewInvoice(order.id)}>{`${currency} ${formatPrice(
          order.payment_total
        )}`}</td>
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
