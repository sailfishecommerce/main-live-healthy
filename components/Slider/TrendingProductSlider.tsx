/* eslint-disable no-nested-ternary */
import memoize from 'memoize-one'
import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { FixedSizeList as List } from 'react-window'

import LoadProducts from '@/components/Loader/ProductsLoader'
import ProductTags from '@/components/Tag/ProductTags'
import { useMediaQuery } from '@/hooks'
import useProduct from '@/hooks/useProduct'
import getThreeVendors from '@/lib/getThreeVendors'
import toSlug from '@/lib/toSlug'

import MemoizedTrendingProductRow from './TrendingProductRow'

const memoisedSelectedproductsFunc = memoize(
  (selectedProducts: any) => selectedProducts
)

export default function TrendingProductSlider({
  index,
  selectedVendor,
  category,
  tabColor,
  updateVendor,
}: any) {
  const { getProductsInACategory } = useProduct()
  const mobile = useMediaQuery('(max-width:426px)')
  const laptop = useMediaQuery('(max-width:1440px)')
  const midLaptop = useMediaQuery('(max-width:1024px)')
  const tablet = useMediaQuery('(max-width:768px)')

  const categorySlug = toSlug(category)
  const { data, status } = useQuery(
    `get-products-in-${categorySlug}`,
    () => getProductsInACategory(category),
    { staleTime: Infinity }
  )
  const products = data?.data
  const threeFirstVendors = useMemo(() => getThreeVendors(products), [products])

  const deviceWidth = mobile
    ? { size: 190, height: 300, width: 400 }
    : tablet
    ? { size: 220, height: 400, width: 720 }
    : midLaptop
    ? { size: 240, height: 400, width: 900 }
    : laptop
    ? { size: 260, height: 400, width: 1200 }
    : { size: 270, height: 400, width: 1450 }

  const selectedProducts =
    selectedVendor?.vendor && selectedVendor.index === index
      ? products?.filter(
          (product: any) => product.vendor === selectedVendor.vendor
        )
      : products

  const memoisedSelectedproducts =
    memoisedSelectedproductsFunc(selectedProducts)

  return (
    <section className="lg:py-4 py-2 lg:my-6 rounded-xl container lg:px-4 pl-4 mx-auto lg:bg-gray-100">
      {category && (
        <Link href={`/collection/${toSlug(category)}`}>
          <a className="xl:text-2xl hover:text-red-500 md:text-xl text-lg  font-bold  mb-2 lg:mb-4 lg:ml-3">
            {category}
          </a>
        </Link>
      )}
      {status === 'error' ? (
        'error fetchin products'
      ) : status === 'loading' ? (
        <LoadProducts />
      ) : (
        <div className="group flex items-center justify-center mx-auto">
          <div className="flex items-start flex-col list-products-window">
            <ProductTags
              index={index}
              vendor={selectedVendor}
              tags={threeFirstVendors}
              tabColor={tabColor}
              updateVendor={updateVendor}
            />
            <List
              useIsScrolling
              height={deviceWidth.height}
              itemCount={selectedProducts.length}
              itemData={{
                products: memoisedSelectedproducts,
                tabColor,
              }}
              itemSize={deviceWidth.size}
              layout="horizontal"
              width={deviceWidth.width}
            >
              {MemoizedTrendingProductRow}
            </List>
          </div>
        </div>
      )}
    </section>
  )
}
