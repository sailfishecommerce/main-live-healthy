import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import Product from '@/components/Cards/ProductCard'
import ProductTags from '@/components/Tag/ProductTags'
import selectRandomColor from '@/lib/selectRandomColor'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import '@splidejs/splide/dist/css/splide.min.css'

interface Props {
  title: string
  tags?: string[]
  tabColor?: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  hits?: any[]
}

function InfiniteHitsSliderComponent({
  hits,
  tags,
  tabColor,
  productClassName,
  randomColor,
}: Props) {
  return (
    <section className="w-full">
      {tags && <ProductTags tags={tags} tabColor={tabColor} />}

      <Splide
        options={{
          perPage: 6,
          breakpoints: {
            800: {
              perPage: 2,
              padding: '2rem',
            },
            1200: {
              perPage: 3,
            },
            1440: {
              perPage: 5,
            },
          },
        }}
        className="productSlider container mx-auto"
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
    </section>
  )
}

const InfiniteHitsSlider = connectInfiniteHits<any, any>(
  memo(
    withDebugLayer(InfiniteHitsSliderComponent, 'InfiniteHitsWidget'),
    isEqual
  )
)

export default InfiniteHitsSlider
