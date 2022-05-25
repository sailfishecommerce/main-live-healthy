/* eslint-disable no-nested-ternary */
import classNames from 'classnames'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

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
  className,
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
    <section
      className={classNames('lg:pt-6 my-3 pl-3 container mx-auto', className)}
    >
      {category && (
        <h4 className="xl:text-2xl md:text-xl text-lg  -mt-3 font-bold  mb-2 lg:mb-4 lg:ml-3">
          {category}
        </h4>
      )}
      {status === 'error'
        ? 'error fetchin products'
        : status === 'loading'
        ? 'Loading ...'
        : data?.data.length > 0 && (
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
          )}
    </section>
  )
}
