/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useAtom } from 'jotai'

import ProductTabCard from '@/components/Cards/ProductTabCard'
import ProductTabSliderDropdown from '@/components/Slider/ProductTabSliderDropdown'
import { useProductInRange } from '@/hooks/useLivehealthyProduct'
import { productRatingAtom } from '@/lib/atomConfig'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ProductTabSlider() {
  const [productRating] = useAtom(productRatingAtom)

  let query
  if (productRating === 3) {
    query = { query: { $lt: 3 }, id: 'newProducts' }
  } else if (productRating === 4) {
    query = { query: { $eq: 4 }, id: 'featuredProducts' }
  } else {
    query = { query: { $eq: 5 }, id: 'specialProducts' }
  }
  const [data, status] = useProductInRange(query)

  console.log('data', data?.length)

  return (
    <section className="itemSlider py-6 product-tab-slider items-start container mx-auto px-6">
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
