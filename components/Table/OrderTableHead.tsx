import React from 'react'

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
  return (
    <>
      <thead>
        <tr className="bg-white">
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
