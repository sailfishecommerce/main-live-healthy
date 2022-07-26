/* eslint-disable no-nested-ternary */
import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import LazyLoader from '@/components/Loader/LazyLoader'
import LoadProducts from '@/components/Loader/ProductsLoader'
import TrendingProductSlider from '@/components/Slider/TrendingProductSlider'
import ProductTags from '@/components/Tag/ProductTags'
import useProduct from '@/hooks/useProduct'
import useSlider from '@/hooks/useSlider'
import getThreeVendors from '@/lib/getThreeVendors'
import toSlug from '@/lib/toSlug'

export default function TrendingProduct({
  index,
  selectedVendor,
  category,
  tabColor,
  updateVendor,
}: any) {
  const { getProductsInACategory } = useProduct()
  const { memoisedData } = useSlider()
  const categorySlug = toSlug(category)
  const { data, status } = useQuery(
    `get-products-in-${categorySlug}`,
    () => getProductsInACategory(category),
    { staleTime: Infinity }
  )
  const products = data?.data
  const threeFirstVendors = useMemo(() => getThreeVendors(products), [products])

  const selectedProducts =
    selectedVendor?.vendor && selectedVendor.index === index
      ? products?.filter(
          (product: any) => product.vendor === selectedVendor.vendor
        )
      : products

  const memoisedSelectedproducts = memoisedData(selectedProducts)

  return (
    <LazyLoader height={400} mobileHeight={300}>
      <>
        <section className="trendingProduct lg:py-4 py-2 lg:my-6 rounded-xl container lg:px-4 pl-4 mx-auto lg:bg-gray-100">
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
            <TrendingProductSlider
              products={memoisedSelectedproducts}
              threeFirstVendors={threeFirstVendors}
              tabColor={tabColor}
            >
              <ProductTags
                index={index}
                vendor={selectedVendor}
                tags={threeFirstVendors}
                tabColor={tabColor}
                updateVendor={updateVendor}
              />
            </TrendingProductSlider>
          )}
        </section>
        <style jsx>
          {`
            .trendingProduct {
              overflow-x: hidden;
            }
            @media (max-width: 768px) {
              .trendingProduct {
                overflow-x: scoll;
              }
            }
          `}
        </style>
      </>
    </LazyLoader>
  )
}
