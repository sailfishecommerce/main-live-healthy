import { memo } from 'react'
import { areEqual } from 'react-window'

import ProductTabCard from '@/components/Cards/ProductTabCard'

function ProductSliderItem({ index, style, data }: any) {
  const { products } = data
  const product = products[index]
  return (
    <>
      <div className="productView flex flex-col" style={style}>
        <ProductTabCard product={product} />
      </div>
    </>
  )
}

const MemoizeProductSliderItem = memo(ProductSliderItem, areEqual)
export default MemoizeProductSliderItem
