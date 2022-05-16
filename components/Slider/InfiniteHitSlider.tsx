import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import ProductTags from '@/components/Tag/ProductTags'
import getThreeVendors from '@/lib/getThreeVendors'
import selectRandomColor from '@/lib/selectRandomColor'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import '@splidejs/splide/dist/css/splide.min.css'

const Product = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductCard' */ '@/components/Cards/ProductCard'
    ),
  {
    ssr: false,
  }
)

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
  tabColor,
  productClassName,
  randomColor,
}: Props) {
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

const InfiniteHitsSlider = connectInfiniteHits<any, any>(
  memo(
    withDebugLayer(InfiniteHitsSliderComponent, 'InfiniteHitsWidget'),
    isEqual
  )
)

export default InfiniteHitsSlider
