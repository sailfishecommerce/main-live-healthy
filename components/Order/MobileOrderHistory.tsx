/* eslint-disable react/no-array-index-key */
import mobileOrderHistory from '@/json/order-history.json'

export default function MobileOrderHistory() {
  return (
    <div className="order-history mb-6">
      <h4 className="font-medium text-lg my-3">Order History</h4>
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            {mobileOrderHistory.mobileHead.map(
              (item: string, index: number) => (
                <th
                  key={index}
                  scope="col"
                  className="font-bold text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {mobileOrderHistory.body.map((item, index) => {
            const paymentStyle =
              item.paymentStatus === 'Paid' ? 'paid' : 'not-paid'

            const deliveryStyle =
              item.deliveryStatus === 'Paid' ? 'paid' : 'not-paid'
            return (
              <tr key={index} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className={`payment-status ${paymentStyle}`}>
                    <div className="indicator" />
                    {item.paymentStatus}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className={`payment-status  ${deliveryStyle}`}>
                    <div className="indicator" />
                    {item.deliveryStatus}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
