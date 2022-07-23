import { memo } from 'react'
import { areEqual } from 'react-window'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'
import { ProductLoader } from '@/components/Loader/ProductTabLoader'

function RecommendationItemComponent({ index, isScrolling, style, data }: any) {
  const { products } = data
  const product = products[index]

  return (
    <div>
      <>
        {isScrolling ? (
          <div style={style}>
            <div className="mr-4">
              <ProductLoader />
            </div>
          </div>
        ) : (
          <div className="productView flex flex-col" style={style}>
            <RecommendedProductCard product={product} />
          </div>
        )}
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
