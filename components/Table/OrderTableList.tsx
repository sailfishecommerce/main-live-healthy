/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

import { selectedInvoiceAtom } from '@/lib/atomConfig'
import { formatOrderDate } from '@/lib/formatOrderDate'
import { formatPrice } from '@/lib/formatPrice'

interface OrderTableListProps {
  order: {
    id: number
    billing: {
      name: string
    }
    paid: boolean
    number: number
    delivered: boolean
    currency: string
    shipping: {
      name: string
    }
    payment_total: number
    date_created: string
  }
  index: number
  setAllIndex: Dispatch<SetStateAction<number[]>>
  allIndex: number[]
}

export default function OrderTableList({
  order,
  index,
  setAllIndex,
  allIndex,
}: OrderTableListProps) {
  const [selectedInvoice, setSelectedInvoice] = useAtom(selectedInvoiceAtom)
  const router = useRouter()
  const indexNumber = index + 1
  if (!allIndex.includes(indexNumber)) {
    allIndex.push(indexNumber)
  }

  useEffect(() => {
    setAllIndex(allIndex)
  }, [])

  function deleteItemInArray(givenArray: number[], item: number) {
    const itemIndex = givenArray.indexOf(item)
    givenArray.splice(itemIndex, 1)
    return givenArray
  }

  const inputChecked = selectedInvoice.selected.includes(indexNumber)

  function updateSelectedAtom() {
    if (selectedInvoice.selected.includes(indexNumber)) {
      const selectedItemArray = deleteItemInArray(
        selectedInvoice.selected,
        indexNumber
      )
      setSelectedInvoice({ selectAll: false, selected: selectedItemArray })
    } else {
      setSelectedInvoice({
        selected: [...selectedInvoice.selected, indexNumber],
        selectAll: false,
      })
    }
  }

  function viewInvoice(id: any | string) {
    router.push(`/admin/invoice/${id}`)
  }

  let customerName = order.billing.name || order.shipping.name
  if (order.billing.name?.includes('undefined')) {
    customerName = '- -'
  }
  const paymentType = order.paid ? 'Paid' : 'Unpaid'
  const orderFulfillment = order.delivered ? 'Fulfilled' : 'Unfulfilled'
  const currency = order.currency === 'HKD' ? 'HK $' : order.currency

  return (
    <>
      <tr key={order.id} className="bg-white row p-4">
        <td>
          <input
            checked={inputChecked}
            type="checkbox"
            onChange={updateSelectedAtom}
          />
        </td>
        <td onClick={() => viewInvoice(order.id)}>{indexNumber}</td>
        <td onClick={() => viewInvoice(order.id)}>{order.number}</td>
        <td onClick={() => viewInvoice(order.id)}>
          {formatOrderDate(order.date_created)}
        </td>
        <td onClick={() => viewInvoice(order.id)}>{customerName}</td>
        <td onClick={() => viewInvoice(order.id)}>{paymentType}</td>
        <td onClick={() => viewInvoice(order.id)}>{orderFulfillment}</td>
        <td onClick={() => viewInvoice(order.id)}>{`${currency} ${formatPrice(
          order.payment_total
        )}`}</td>
      </tr>
      <style jsx>
        {`
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
