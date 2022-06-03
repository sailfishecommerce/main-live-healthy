/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import RecommendedProductCard from '@/components/Cards/RecommendedProductCard'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'
import '@splidejs/splide/dist/css/splide.min.css'

interface Props {
  cartItems: any[]
}

export default function RecommendationSlider({ cartItems }: Props) {
  console.log('cartItems', cartItems)
  const [data, status] = useLiveHealthyProduct()

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
