/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import type { Key } from 'react'
import React from 'react'

import OrderTableHead from '@/components/Table/OrderTableHead'
import { selectedInvoiceAtom } from '@/lib/atomConfig'
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
  const [selectedInvoice] = useAtom(selectedInvoiceAtom)

  const router = useRouter()

  function viewInvoice(id: any | string) {
    router.push(`/admin/invoice/${id}`)
  }
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
              <tr key={order.id} className="bg-white row p-4">
                <td>
                  <input checked={selectedInvoice} type="checkbox" />
                </td>
                <td onClick={() => viewInvoice(order.id)}>{orderNumber}</td>
                <td onClick={() => viewInvoice(order.id)}>{order.number}</td>
                <td onClick={() => viewInvoice(order.id)}>
                  {formatOrderDate(order.date_created)}
                </td>
                <td onClick={() => viewInvoice(order.id)}>{customerName}</td>
                <td onClick={() => viewInvoice(order.id)}>{paymentType}</td>
                <td onClick={() => viewInvoice(order.id)}>
                  {orderFulfillment}
                </td>
                <td
                  onClick={() => viewInvoice(order.id)}
                >{`${currency} ${formatPrice(order.payment_total)}`}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          table {
          }
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
