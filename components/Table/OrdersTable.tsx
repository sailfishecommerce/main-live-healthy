import { useState } from 'react'

import OrderTableHead from '@/components/Table/OrderTableHead'
import OrderTableList from '@/components/Table/OrderTableList'

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
