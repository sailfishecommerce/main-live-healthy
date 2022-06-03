/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'
import '@splidejs/splide/dist/css/splide.min.css'
import useRecommendedProduct from '@/hooks/useRecommendedProduct'

interface Props {
  cartItems: any[]
}

export default function RecommendationSlider({ cartItems }: Props) {
  const [data, status] = useRecommendedProduct(cartItems)

  return (
    <section className="itemSlider recommendation-slider">
      <div className="mb-2">
        <h3 className="lg:text-xl text-md font-bold">Recommended for you</h3>
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
