import { useAtom } from 'jotai'
import React from 'react'

import { selectedInvoiceAtom } from '@/lib/atomConfig'

const headContent = [
  'S/N',
  'ORDER',
  'DATE',
  'CUSTOMER',
  'PAYMENT',
  'FULFILLMENT',
  'TOTAL',
]

export default function OrderTableHead() {
  const [selectedInvoice, setSelectedInvoice] = useAtom(selectedInvoiceAtom)

  function onChangeHandler() {
    setSelectedInvoice(!selectedInvoice)
  }
  return (
    <>
      <thead>
        <tr className="bg-white">
          <th>
            <input
              type="checkbox"
              checked={selectedInvoice}
              onChange={onChangeHandler}
            />
          </th>
          {headContent.map((content) => (
            <th key={content}>{content}</th>
          ))}
        </tr>
      </thead>
      <style jsx>
        {`
          tr.bg-white th {
            padding: 11px 16px;
            border-bottom: 1px solid #e5e5f5;
          }
        `}
      </style>
    </>
  )
}
