/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import dynamic from 'next/dynamic'

import ProductTabCard from '@/components/Cards/ProductTabCard'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'

import '@splidejs/splide/dist/css/splide.min.css'

const ProductTabSliderDropdown = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabSliderDropdown' */ '@/components/Slider/ProductTabSliderDropdown'
    )
)

export default function ProductTabSlider() {
  const [data, status] = useLiveHealthyProduct()

  return (
    <section className="itemSlider product-tab-slider items-start container mx-auto px-6">
      <ProductTabSliderDropdown />
      <div className="tab-products mt-2 md:mt-0 flex items-center">
        {status === 'error' ? (
          'unable to load products'
        ) : status === 'loading' ? (
          'loading'
        ) : (
          <Splide
            options={{
              perPage: 3,
              padding: '5rem',
              breakpoints: {
                500: {
                  perPage: 1,
                },
                1000: {
                  perPage: 2,
                },
              },
            }}
            className="mx-auto container"
          >
            {data.map((product: any) => (
              <SplideSlide key={product.id}>
                <ProductTabCard product={product} />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </section>
  )
}
