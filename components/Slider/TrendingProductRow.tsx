import { memo } from 'react'
import { areEqual } from 'react-window'

import Product from '@/components/Cards/Product'
import LoadProducts from '@/components/Loader/ProductsLoader'
import selectRandomColor from '@/lib/selectRandomColor'

function TrendingProductRow({ index, isScrolling, style, data }: any) {
  const { products, tabColor } = data
  const product = products[index]
  return (
    <>
      {isScrolling ? (
        <LoadProducts />
      ) : (
        <div className="productView flex flex-col" style={style}>
          <Product
            color={tabColor ? tabColor : selectRandomColor()}
            product={product}
          />
        </div>
      )}
    </>
  )
}

const MemoizedTrendingProductRow = memo(TrendingProductRow, areEqual)
export default MemoizedTrendingProductRow
