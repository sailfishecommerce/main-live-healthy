import { memo } from 'react'
import { areEqual } from 'react-window'

import ProductTabCard from '@/components/Cards/ProductTabCard'
import { ProductLoader } from '@/components/Loader/ProductTabLoader'

function ProductSliderItem({ index, isScrolling, style, data }: any) {
  const { products } = data
  const product = products[index]
  return (
    <>
      {isScrolling ? (
        <div style={style}>
          <div className="mr-4">
            <ProductLoader />
          </div>
        </div>
      ) : (
        <div className="productView flex flex-col" style={style}>
          <ProductTabCard product={product} />
        </div>
      )}
    </>
  )
}

const MemoizeProductSliderItem = memo(ProductSliderItem, areEqual)
export default MemoizeProductSliderItem
