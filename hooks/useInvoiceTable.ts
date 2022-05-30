import { useAtom } from 'jotai'

import {
  allIndexAtom,
  deletedIndexAtom,
  selectedInvoiceAtom,
} from '@/lib/atomConfig'

export default function useInvoiceTable() {
  const [selectedInvoice, setSelectedInvoice] = useAtom(selectedInvoiceAtom)
  const [allIndex, setAllIndex] = useAtom(allIndexAtom)
  const [deletedIndex, setDeletedIndex] = useAtom(deletedIndexAtom)

  const { selectAll } = selectedInvoice

  function onChangeHandler() {
    setSelectedInvoice({
      selected: allIndex,
      selectAll: !selectAll,
      type: 'head',
    })
  }

  function deleteItemInArray(givenArray: number[], item: number) {
    const itemIndex = givenArray.indexOf(item)
    const deletedIndexArray = givenArray.splice(itemIndex, 1)
    if (!deletedIndex.includes(deletedIndexArray[0])) {
      setDeletedIndex([...deletedIndex, deletedIndexArray[0]])
    }
    return givenArray
  }

  function updateSelectedIndex(indexNumber: number) {
    if (selectedInvoice.selected.includes(indexNumber)) {
      const selectedItemArray = deleteItemInArray(
        selectedInvoice.selected,
        indexNumber
      )
      setSelectedInvoice({
        ...selectedInvoice,
        selected: selectedItemArray,
        type: 'body',
      })
    } else {
      setSelectedInvoice({
        ...selectedInvoice,
        selected: [...selectedInvoice.selected, indexNumber],
        type: 'body',
      })
    }
  }

  return {
    onChangeHandler,
    selectedInvoice,
    updateSelectedIndex,
    setSelectedInvoice,
    allIndex,
    setAllIndex,
    deletedIndex,
  }
}
