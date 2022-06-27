import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

import Product from '@/components/Cards/Product'
import selectRandomColor from '@/lib/selectRandomColor'

import '@splidejs/splide/dist/css/splide.min.css'

interface Props {
  tags?: string[]
  tabColor: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  selectedProducts: any[]
}

function CategoryProductSliderComponent({
  tabColor,
  productClassName,
  randomColor,
  selectedProducts,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-full">
      {children}
      <Splide
        options={{
          perPage: 6,
          gap: '2px',
          breakpoints: {
            280: {
              perPage: 1,
            },
            500: {
              perPage: 2,
              padding: '2rem',
            },
            1000: {
              perPage: 3,
              padding: '2rem',
            },
            1200: {
              perPage: 4,
            },
            1440: {
              perPage: 5,
            },
          },
        }}
        className="productSlider itemSlider container mx-auto"
      >
        <AnimatePresence>
          {selectedProducts?.map((product) => (
            <SplideSlide key={product.id}>
              <Product
                color={randomColor ? selectRandomColor() : tabColor}
                product={product}
                className={productClassName}
              />
            </SplideSlide>
          ))}
        </AnimatePresence>
      </Splide>
    </div>
  )
}

const CategoryProductSlider = memo(CategoryProductSliderComponent, isEqual)

export default CategoryProductSlider
