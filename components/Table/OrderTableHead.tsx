/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import useInvoiceTable from '@/hooks/useInvoiceTable'

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
  const {
    allIndex,
    setAllIndex,
    setSelectedInvoice,
    selectedInvoice,
    deletedIndex,
    onChangeHandler,
  } = useInvoiceTable()
  const { selectAll, type } = selectedInvoice

  useEffect(() => {
    if (!deletedIndex.every((dI) => allIndex.includes(dI)) && type !== 'body') {
      setAllIndex([...allIndex, ...deletedIndex])
    }
  }, [selectAll])

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
              checked={selectAll}
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
