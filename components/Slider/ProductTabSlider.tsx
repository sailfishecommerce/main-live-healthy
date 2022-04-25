/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import ProductTabCard from '@/components/Cards/ProductTabCard'
import ProductTabDropdown from '@/components/Dropdown/ProductTabDropdown'
import { useMediaQuery } from '@/hooks'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ProductTabSlider() {
  const tabs = ['New Products', 'Special Products', 'Featured Products']
  const [data, status] = useLiveHealthyProduct()
  const tabWidth = useMediaQuery('(max-width:768px)')

  return (
    <section className="itemSlider product-tab-slider items-start container mx-auto px-6">
      {tabWidth ? (
        <ProductTabDropdown />
      ) : (
        <div className="tabs flex items-center mb-6">
          {tabs.map((tab, index) => {
            const activeTab = index === 0 ? 'text-black' : 'text-gray-500'
            return (
              <h4
                key={index}
                className={`${activeTab} text-xs md:text-xl lg:text-2xl font-bold mr-8`}
              >
                {tab}
              </h4>
            )
          })}
        </div>
      )}
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
