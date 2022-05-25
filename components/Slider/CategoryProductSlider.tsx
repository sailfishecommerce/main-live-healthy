import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import Product from '@/components/Cards/ProductCard'
import ProductTags from '@/components/Tag/ProductTags'
import { selectedVendorAtom } from '@/lib/atomConfig'
import getThreeVendors from '@/lib/getThreeVendors'
import selectRandomColor from '@/lib/selectRandomColor'

import '@splidejs/splide/dist/css/splide.min.css'

interface Props {
  tags?: string[]
  tabColor: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  products?: any[]
}

function CategoryProductSliderComponent({
  products,
  tabColor,
  productClassName,
  randomColor,
}: Props) {
  const [selectedVendor, setSelectedVendor] = useAtom(selectedVendorAtom)

  const threeFirstVendors = useMemo(() => getThreeVendors(products), [])

  function updateVendor(vendor: string) {
    setSelectedVendor(vendor)
  }

  const selectedProducts = selectedVendor
    ? products?.filter((product) => product.vendor === selectedVendor)
    : products

  return (
    <div className="w-full">
      {threeFirstVendors.length > 0 && (
        <ProductTags
          vendor={selectedVendor}
          tags={threeFirstVendors}
          tabColor={tabColor}
          updateVendor={updateVendor}
        />
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
