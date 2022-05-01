import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { useState } from 'react'

function getDate(date: string) {
  const givenDate = new Date(date)
  return givenDate.toDateString()
}

interface OrderItemProps {
  item: {
    id: string
    date_created: string
    grand_total: string
    paid: boolean
    delivered: boolean
    number: string
  }
}

export default function OrderHistoryItem({ item }: OrderItemProps) {
  const [showProducts, setShowProducts] = useState(false)

  function toggleProductVisibility() {
    setShowProducts(!showProducts)
  }

  const paymentStyle = item.paid ? 'paid' : 'not-paid'

  const deliveryStyle = item.delivered ? 'delivered' : 'not-delivered'
  return (
    <tr key={item.id} className="hover:bg-gray-100 border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.number}{' '}
        <button
          type="button"
          className="mx-2 hover:border-green-500 hover:border px-2 py-1 hover:rounded-xl"
          onClick={toggleProductVisibility}
        >
          {showProducts ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {getDate(item.date_created)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <FormattedPrice
          price={item.grand_total}
          className="text-black text-md"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className={`payment-status ${paymentStyle}`}>
          <div className="indicator" />
          {item.paid ? 'Paid' : 'Not Paid'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className={`payment-status  ${deliveryStyle}`}>
          <div className="indicator" />
          {item.delivered ? 'delivered' : 'not-delivered'}
        </div>
      </td>
    </tr>
  )
}
