import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import { Configure, Index, connectHits } from 'react-instantsearch-dom'

import Product from '@/components/Cards/ProductCard'
import selectRandomColor from '@/lib/selectRandomColor'
import { indexName } from '@/utils/env'
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
interface Props {
  title: string
  tabColor?: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  query: string
  indexId: string
}

function ProductHitsSliderComponent({
  hits,
  tabColor,
  productClassName,
  randomColor,
}: HitProps) {
  console.log('hits', hits)
  return (
    <div className="w-full">
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

export default function ProductSlider({
  title,
  tabColor,
  productName,
  randomColor,
  query,
  indexId,
}: Props) {
  return (
    <Index indexName={indexName} indexId={indexId}>
      <Configure filters={query} hitsPerPage={18} />
      <section className="itemSlider relative container mx-auto flex flex-col my-0 mb-2 md:my-4 px-4 md:px-0">
        <div className="top mb-4 flex items-center justify-between">
          {productName ? (
            <h1 className="font-bold text-md md:text-xl 2xl:text2xl">
              {title} <span className="mountain-green">{productName}</span>{' '}
              users
            </h1>
          ) : (
            <h1 className="font-bold text-xl 2xl:text-2xl">{title}</h1>
          )}
        </div>
        <ProductHitsSlider randomColor={randomColor} tabColor={tabColor} />
      </section>
    </Index>
  )
}
