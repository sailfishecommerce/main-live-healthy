/* eslint-disable react/no-array-index-key */
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import OrderHistoryProductItem from '@/components/Order/OrderHistoryProductItem'
import FormattedPrice from '@/components/Price/FormattedPrice'

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
    items: Array<{ product_id: string }> | any
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
    <>
      <tr className="hover:bg-gray-100 border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.number}
          <button
            type="button"
            aria-label="navigate"
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
      <tr>
        {showProducts && (
          <td className="bg-white left-20 top-36">
            {item.items.map((productItem: any, index: number) => (
              <OrderHistoryProductItem
                key={`${item.number}-${index}`}
                item={productItem}
              />
            ))}
          </td>
        )}
      </tr>
    </>
  )
}
