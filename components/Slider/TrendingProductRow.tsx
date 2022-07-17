import { memo } from 'react'
import { areEqual } from 'react-window'

import Product from '@/components/Cards/Product'
import { ProductLoader } from '@/components/Loader/ProductsLoader'
import selectRandomColor from '@/lib/selectRandomColor'

function TrendingProductRow({ index, isScrolling, style, data }: any) {
  const { products, tabColor } = data
  const product = products[index]
  return (
    <>
      {isScrolling ? (
        <div style={style}>
          <div className="mr-4">
            <ProductLoader className="mr-4" bigger={true} />
          </div>
        </div>
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
