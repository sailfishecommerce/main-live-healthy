/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import Product from '@/components/Cards/ProductCard'
import { useProductInRange } from '@/hooks/useLivehealthyProduct'
import '@splidejs/splide/dist/css/splide.min.css'
import selectRandomColor from '@/lib/selectRandomColor'

export default function BestSellerSlider() {
  const [data, status] = useProductInRange({
    query: { $gt: 4 },
    id: 'bestSeller',
  })

  return (
    <section className="itemSlider best-seller-slider py-4 px-4 xl:py-8 relative w-full bg-gray-platinum mx-auto flex relative z-10 flex-col my-4">
      <div className="w-full">
        <div className="container mb-0 xl:mb-8 mx-auto">
          <h1 className="font-bold text-xl md:text-3xl">Best Sellers</h1>
        </div>

        <div className="2xl:pl-20 pl-0 products mx-auto mt-4 flex items-center justify-between pb-4 xl:pb-6">
          {status === 'error' ? (
            'unable to load products'
          ) : status === 'loading' ? (
            'loading'
          ) : (
            <Splide
              options={{
                perPage: 5,
                padding: '5rem',
                breakpoints: {
                  500: {
                    perPage: 2,
                    padding: '1rem',
                  },
                  800: {
                    perPage: 2,
                  },
                  1200: {
                    perPage: 3,
                  },
                },
              }}
              className="w-full mx-auto bestsellerSplide"
            >
              {data.map((product: any) => (
                <SplideSlide key={product.id}>
                  <Product
                    className="md:mr-8 mr-4 bg-white rounded-xl relative z-20"
                    color={selectRandomColor()}
                    product={product}
                    imageClassName="border-gray-300 flex items-center justify-center"
                  />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
      </div>
    </section>
  )
}
