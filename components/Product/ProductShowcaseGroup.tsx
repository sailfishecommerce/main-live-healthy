import { useAtom } from 'jotai'

import TrendingProduct from '@/components/Product/TrendingProduct'
import { selectedVendorAtom } from '@/lib/atomConfig'

interface Props {
  group: Array<{
    category: string
    tabColor: string
  }>
}

export default function ProductShowcaseGroup({ group }: Props) {
  const [selectedVendor, setSelectedVendor] = useAtom(selectedVendorAtom)

  function updateVendor(vendor: string, index: number) {
    if (
      selectedVendor !== null &&
      selectedVendor.vendor === vendor &&
      selectedVendor.index === index
    ) {
      setSelectedVendor({ vendor: '', index })
    } else {
      setSelectedVendor({ vendor, index })
    }
  }

  return (
    <>
      {group.map((groupItem, index) => (
        <TrendingProduct
          index={index}
          key={groupItem.category}
          category={groupItem.category}
          tabColor={groupItem.tabColor}
          updateVendor={updateVendor}
          selectedVendor={selectedVendor}
        />
      ))}
    </>
  )
}
