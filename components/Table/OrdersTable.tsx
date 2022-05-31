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

export default function OrdersTable({ orders, showInput = true }: any) {
  const allIndexArray: number[] = []

  return (
    <table className="table w-full rounded-3xl my-4">
      <OrderTableHead showInput={showInput} />
      <tbody>
        {orders.map((order: orderType, index: number) => {
          return (
            <OrderTableList
              allIndexArray={allIndexArray}
              order={order}
              key={order.id}
              index={index}
              showInput={showInput}
            />
          )
        })}
      </tbody>
    </table>
  )
}
