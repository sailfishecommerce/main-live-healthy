import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'

import Product from '@/components/Cards/Product'
import selectRandomColor from '@/lib/selectRandomColor'
import '@splidejs/splide/dist/css/splide.min.css'

interface HitProps {
  title: string
  tags?: string[]
  tabColor?: string
  products: any[]
  productName?: string
  productClassName?: string
  randomColor?: boolean
}
interface Props {
  title: string
  tabColor?: string
  products: any[]
  productName?: string
  productClassName?: string
  randomColor?: boolean
}

function VendorProductSlider({
  tabColor,
  productClassName,
  products,
  randomColor,
}: HitProps) {
  return (
    <div className="w-full">
      <Splide
        options={{
          perPage: 6,
          gap: '5px',
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
          {products.map((product: any) => (
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

export default function ProductSlider({
  title,
  tabColor,
  productName,
  randomColor,
  products,
}: Props) {
  return (
    <section className="itemSlider relative container mx-auto flex flex-col my-0 mb-2 md:my-4 lg:px-4 md:px-0">
      <div className="top mb-4 flex items-center justify-between">
        {productName ? (
          <h1 className="font-bold text-md md:text-xl 2xl:text2xl">
            {title} <span className="mountain-green">{productName}</span> users
          </h1>
        ) : (
          <h1 className="font-bold text-xl 2xl:text-2xl">{title}</h1>
        )}
      </div>
      <VendorProductSlider
        products={products}
        randomColor={randomColor}
        tabColor={tabColor}
        title={title}
      />
    </section>
  )
}
