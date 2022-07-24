import { memo } from 'react'
import { areEqual } from 'react-window'

import Product from '@/components/Cards/Product'
import selectRandomColor from '@/lib/selectRandomColor'

function BestSellerItem({ index, style, data }: any) {
  const { products } = data
  const product = products[index]
  return (
    <>
      <div className="productView flex flex-col" style={style}>
        <Product
          className="md:mr-8 mr-4 bg-white rounded-xl relative z-20"
          color={selectRandomColor()}
          product={product}
          imageClassName="border-gray-300 flex items-center justify-center"
        />
      </div>
    </>
  )
}

const MemoizedBestSellerItem = memo(BestSellerItem, areEqual)
export default MemoizedBestSellerItem
