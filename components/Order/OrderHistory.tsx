import OrderHistoryItem from '@/components/Order/OrderHistoryItem'
import orderHistory from '@/json/order-history.json'

export default function OrderHistory({ orders }: any) {
  return (
    <div className="order-history mb-6">
      <h4 className="font-medium text-lg my-3">Order History</h4>
      <div className="tableWrapper">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              {orderHistory.head.map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="font-bold text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((item: any) => (
              <OrderHistoryItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .tableWrapper {
            overflow-x: auto;
          }
        `}
      </style>
    </div>
  )
}
