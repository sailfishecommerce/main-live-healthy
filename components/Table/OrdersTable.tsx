import axios from 'axios'
import { useEffect, useState } from 'react'

import OrderTableHead from '@/components/Table/OrderTableHead'
import OrderTableList from '@/components/Table/OrderTableList'
import invoiceProducts from '@/json/invoice-product.json'
import getInvoiceproductIds from '@/lib/get-invoice-product-ids'

type orderType = {
  billing: { name: any }
  shipping: { name: any }
  paid: any
  delivered: any
  currency: string
  id: number
  number: number
  date_created: string
  payment_total: number
}

export default function OrdersTable({ orders }: any) {
  const [allIndex, setAllIndex] = useState<number[]>([])
  const allIndexArray: number[] = []
  const ordersIds = getInvoiceproductIds(orders)

  useEffect(() => {
    if (invoiceProducts.length === 0) {
      axios.post('/api/get-invoice-products', { ordersIds })
    }
  }, [])

  return (
    <table className="table w-full rounded-3xl my-4">
      <OrderTableHead allIndex={allIndex} />
      <tbody>
        {orders.map((order: orderType, index: number) => {
          return (
            <OrderTableList
              setAllIndex={setAllIndex}
              allIndex={allIndexArray}
              order={order}
              key={order.id}
              index={index}
            />
          )
        })}
      </tbody>
    </table>
  )
}
