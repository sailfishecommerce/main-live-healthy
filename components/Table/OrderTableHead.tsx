/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import {
  allIndexAtom,
  deletedIndexAtom,
  selectedInvoiceAtom,
} from '@/lib/atomConfig'

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
  const [allIndex, setAllIndex] = useAtom(allIndexAtom)
  const [deletedIndex] = useAtom(deletedIndexAtom)

  const { selectAll, type } = selectedInvoice

  function onChangeHandler() {
    setSelectedInvoice({
      selected: allIndex,
      selectAll: !selectAll,
      type: 'head',
    })
  }

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
