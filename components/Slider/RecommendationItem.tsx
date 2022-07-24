import { memo } from 'react'
import { areEqual } from 'react-window'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'

function RecommendationItemComponent({ index, style, data }: any) {
  const { products } = data
  const product = products[index]

  return (
    <div>
      <>
        <div className="productView flex flex-col" style={style}>
          <RecommendedProductCard product={product} />
        </div>
        <style jsx>
          {`
            .productView {
              overflow-y: hidden;
            }
          `}
        </style>
      </>
    </div>
  )
}

const MemoizedRecommendationItem = memo(RecommendationItemComponent, areEqual)
export default MemoizedRecommendationItem
