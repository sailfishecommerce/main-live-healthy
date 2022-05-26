/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

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

interface OrderTableHeadProps {
  allIndex: number[]
}

export default function OrderTableHead({ allIndex }: OrderTableHeadProps) {
  const [selectedInvoice, setSelectedInvoice] = useAtom(selectedInvoiceAtom)
  const { selectAll } = selectedInvoice
  function onChangeHandler() {
    setSelectedInvoice({
      ...selectedInvoice,
      selectAll: !selectAll,
    })
  }

  useEffect(() => {
    if (selectedInvoice.selectAll) {
      setSelectedInvoice({
        ...selectedInvoice,
        selected: allIndex,
      })
    } else {
      setSelectedInvoice({
        ...selectedInvoice,
        selected: [],
      })
    }
  }, [selectAll])

  return (
    <>
      <thead>
        <tr className="bg-white">
          <th>
            <input
              type="checkbox"
              checked={selectedInvoice.selectAll}
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
