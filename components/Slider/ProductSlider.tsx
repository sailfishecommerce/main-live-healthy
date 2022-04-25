/* eslint-disable no-nested-ternary */
import { Splide, SplideSlide } from '@splidejs/react-splide'

import Product from '@/components/Cards/ProductCard'
import ProductTags from '@/components/Tag/ProductTags'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'
import '@splidejs/splide/dist/css/splide.min.css'
import selectRandomColor from '@/lib/selectRandomColor'

interface Props {
  title: string
  tags?: string[]
  tabColor?: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
}
export default function ProductSlider({
  title,
  tags,
  tabColor,
  productName,
  productClassName,
  randomColor,
}: Props) {
  const [data, status] = useLiveHealthyProduct()

  return (
    <section className="itemSlider relative container mx-auto flex flex-col my-0 mb-2 md:my-4 px-4 md:px-0">
      <div className="top mb-4 flex items-center justify-between">
        {productName ? (
          <h1 className="font-bold text-md md:text-xl 2xl:text2xl">
            {title} <span className="mountain-green">{productName}</span> users
          </h1>
        ) : (
          <h1 className="font-bold text-xl 2xl:text-2xl">{title}</h1>
        )}
      </div>
      {tags && <ProductTags tags={tags} tabColor={tabColor} />}
      <div className="products mx-auto container mt-4 flex items-center justify-between pb-0 md:pb-12">
        {status === 'error' ? (
          'unable to load products'
        ) : status === 'loading' ? (
          'loading'
        ) : (
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
            {data.map((product: any) => (
              <SplideSlide key={product.id}>
                <Product
                  color={randomColor ? selectRandomColor() : tabColor}
                  product={product}
                  className={productClassName}
                />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </section>
  )
}
