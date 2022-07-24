import { memo } from 'react'
import { areEqual } from 'react-window'

import Product from '@/components/Cards/Product'
import selectRandomColor from '@/lib/selectRandomColor'

function TrendingProductRow({ index, style, data }: any) {
  const { products, tabColor } = data
  const product = products[index]
  return (
    <>
      <div className="productView flex flex-col" style={style}>
        <Product
          color={tabColor ? tabColor : selectRandomColor()}
          product={product}
        />
      </div>
      <style jsx>
        {`
          .productView {
            overflow-y: hidden;
          }
        `}
      </style>
    </>
  )
}

const MemoizedTrendingProductRow = memo(TrendingProductRow, areEqual)
export default MemoizedTrendingProductRow
