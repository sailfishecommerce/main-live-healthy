import AirwallexOrderTableList from '@/components/Table/AirwallexOrderTableList'
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

export default function OrdersTable({
  orders,
  showInput = true,
  airwallexDataArray,
}: any) {
  const allIndexArray: number[] = []
  const airwallexArrayLength = airwallexDataArray.length

  return (
    <table className="table w-full rounded-3xl my-4">
      <OrderTableHead showInput={showInput} />
      <tbody>
        {airwallexDataArray.map((airwallexData: any, index: number) => (
          <AirwallexOrderTableList
            airwallexData={airwallexData}
            key={airwallexData.id}
            showInput={showInput}
            index={index}
          />
        ))}
        {orders.map((order: orderType, index: number) => {
          return (
            <OrderTableList
              allIndexArray={allIndexArray}
              order={order}
              key={order.id}
              index={index}
              airwallexCount={airwallexArrayLength}
              showInput={showInput}
            />
          )
        })}
      </tbody>
    </table>
  )
}
