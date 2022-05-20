import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { connectHits } from 'react-instantsearch-dom'

import Product from '@/components/Cards/ProductCard'
import ProductTags from '@/components/Tag/ProductTags'
import getThreeVendors from '@/lib/getThreeVendors'
import selectRandomColor from '@/lib/selectRandomColor'
import '@splidejs/splide/dist/css/splide.min.css'

interface HitProps {
  title: string
  tags?: string[]
  tabColor?: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  hits?: any[]
}

function ProductHitsSliderComponent({
  hits,
  tabColor,
  productClassName,
  randomColor,
}: HitProps) {
  const threeFirstVendors = useMemo(() => getThreeVendors(hits), [hits])

  return (
    <div className="w-full">
      {threeFirstVendors.length > 0 && (
        <ProductTags tags={threeFirstVendors} tabColor={tabColor} />
      )}

      <Splide
        options={{
          perPage: 6,
          breakpoints: {
            280: {
              perPage: 1,
            },
            500: {
              perPage: 2,
              padding: '2rem',
            },
            800: {
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
          {hits?.map((product) => (
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

const ProductHitsSlider = connectHits<any, any>(ProductHitsSliderComponent)

export default ProductHitsSlider
