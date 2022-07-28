/* eslint-disable no-nested-ternary */
import { memo } from 'react'

import ProductTabLoader from '@/components/Loader/ProductTabLoader'
import ItemSlider from '@/components/Slider/ItemSlider'
import MemoizedRecommendationItem from '@/components/Slider/RecommendationItem'
import useRecommendedProduct from '@/hooks/useRecommendedProduct'
import useSlider from '@/hooks/useSlider'

interface Props {
  cartItems: any[]
}

function RecommendationSliderComponent({ cartItems }: Props) {
  const [data, status] = useRecommendedProduct(cartItems)

  const { recommendationDimension, memoisedData } = useSlider()

  const memoisedRecommendedProducts =
    status === 'success' ? memoisedData(data) : []

  return (
    <>
      <section className="itemSlider recommendation-slider">
        <div className="mb-4">
          <h3 className="lg:text-xl md:text-lg text-md font-bold">
            Recommended for you
          </h3>
        </div>
        <div className="content mt-6">
          {status === 'error' ? (
            'unable to load products'
          ) : status === 'loading' ? (
            <ProductTabLoader />
          ) : (
            <ItemSlider
              deviceDimension={recommendationDimension}
              itemCount={memoisedRecommendedProducts.length}
              itemData={{
                products: memoisedRecommendedProducts,
              }}
            >
              {MemoizedRecommendationItem}
            </ItemSlider>
          )}
        </div>
      </section>
      <style jsx>
        {`
          .recommendation-slider {
            overflow-x: hidden;
          }
        `}
      </style>
    </>
  )
}
const RecommendationSlider = memo(RecommendationSliderComponent)

export default RecommendationSlider
