import Link from 'next/link'
import type { Key } from 'react'

import OrderTableHead from '@/components/Table/OrderTableHead'
import { formatOrderDate } from '@/lib/formatOrderDate'
import { formatPrice } from '@/lib/formatPrice'

type orderType = {
  billing: { name: any }
  shipping: { name: any }
  paid: any
  delivered: any
  currency: string
  id: Key | null | undefined
  number: number
  date_created: string
  payment_total: number
}

export default function OrdersTable({ orders }: any) {
  return (
    <>
      <table className="table w-full rounded-3xl my-4">
        <OrderTableHead />
        <tbody>
          {orders.map((order: orderType, index: number) => {
            const orderNumber = index + 1
            let customerName = order.billing.name || order.shipping.name
            if (order.billing.name?.includes('undefined')) {
              customerName = '- -'
            }
            const paymentType = order.paid ? 'Paid' : 'Unpaid'
            const orderFulfillment = order.delivered
              ? 'Fulfilled'
              : 'Unfulfilled'
            const currency = order.currency === 'HKD' ? 'HK $' : order.currency
            return (
              <Link passHref key={order.id} href={`/admin/invoice/${order.id}`}>
                <tr className="bg-white row p-4">
                  <td>{orderNumber}</td>
                  <td>{order.number}</td>
                  <td>{formatOrderDate(order.date_created)}</td>
                  <td>{customerName}</td>
                  <td>{paymentType}</td>
                  <td>{orderFulfillment}</td>
                  <td>{`${currency} ${formatPrice(order.payment_total)}`}</td>
                </tr>
              </Link>
            )
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          table {
          }
          .row {
            width: 100%;
            border-bottom: 1px solid #e5e5e6;
            height: 50px;
            padding: 11px 16px;
          }
          .row td {
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
