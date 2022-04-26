/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'
import '@splidejs/splide/dist/css/splide.min.css'

export default function RecommendationSlider() {
  const [data, status] = useLiveHealthyProduct()

  return (
    <section className="itemSlider recommendation-slider">
      <div className="mb-2">
        <h3 className="lg:text-xl text-xs font-bold">Recommended for you</h3>
      </div>
      <div className="content">
        {status === 'error' ? (
          'unable to load products'
        ) : status === 'loading' ? (
          'loading'
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
