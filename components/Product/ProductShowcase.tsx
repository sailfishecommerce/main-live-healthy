/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import LoadProducts from '@/components/Loader/ProductsLoader'
import CategoryProductSlider from '@/components/Slider/CategoryProductSlider'
import ProductTags from '@/components/Tag/ProductTags'
import useProduct from '@/hooks/useProduct'
import getThreeVendors from '@/lib/getThreeVendors'
import toSlug from '@/lib/toSlug'

export type ProductsShowcaseProps = {
  index: number
  className?: string
  category: string
  tabColor: string
  updateVendor: (vendor: string, index: number) => void
  selectedVendor: { vendor: string; index: number } | null
}

export default function ProductShowcase({
  index,
  category,
  tabColor,
  updateVendor,
  selectedVendor,
}: ProductsShowcaseProps) {
  const { getProductsInACategory } = useProduct()
  const categorySlug = toSlug(category)
  const { data, status } = useQuery(
    `get-products-in-${categorySlug}`,
    () => getProductsInACategory(category),
    { staleTime: Infinity }
  )
  const products = data?.data

  const selectedProducts =
    selectedVendor?.vendor && selectedVendor.index === index
      ? products?.filter(
          (product: any) => product.vendor === selectedVendor.vendor
        )
      : products

  const threeFirstVendors = useMemo(() => getThreeVendors(products), [products])

  return (
    <section className="lg:py-4 py-2 lg:my-6 rounded-xl container lg:px-4 px-2 mx-auto lg:bg-gray-100">
      {category && (
        <h4 className="xl:text-2xl md:text-xl text-lg  font-bold  mb-2 lg:mb-4 lg:ml-3">
          {category}
        </h4>
      )}
      {status === 'error' ? (
        'error fetchin products'
      ) : status === 'loading' ? (
        <LoadProducts />
      ) : (
        data?.data?.length > 0 && (
          <CategoryProductSlider
            tabColor={tabColor}
            selectedProducts={selectedProducts}
          >
            <ProductTags
              index={index}
              vendor={selectedVendor}
              tags={threeFirstVendors}
              tabColor={tabColor}
              updateVendor={updateVendor}
            />
          </CategoryProductSlider>
        )
      )}
    </section>
  )
}
