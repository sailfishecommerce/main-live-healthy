/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { memo } from 'react'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'
import '@splidejs/splide/dist/css/splide.min.css'
import ProductTabLoader from '@/components/Loader/ProductTabLoader'
import useRecommendedProduct from '@/hooks/useRecommendedProduct'

interface Props {
  cartItems: any[]
}

function RecommendationSliderComponent({ cartItems }: Props) {
  const [data, status] = useRecommendedProduct(cartItems)

  return (
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
          <Splide
            options={{
              perPage: 2,
              padding: '2rem',
              breakpoints: {
                800: {
                  perPage: 1,
                },
              },
            }}
          >
            {data.map((product: any) => (
              <SplideSlide key={product.id}>
                <RecommendedProductCard product={product} />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </section>
  )
}
const RecommendationSlider = memo(RecommendationSliderComponent)

export default RecommendationSlider
