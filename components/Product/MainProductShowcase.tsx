/* eslint-disable no-nested-ternary */
import classNames from 'classnames'
import { useQuery } from 'react-query'

import CategoryProductSlider from '@/components/Slider/CategoryProductSlider'
import useProduct from '@/hooks/useProduct'

export type ProductsShowcaseProps = {
  className?: string
  category: string
  tabColor?: string
}

export default function MainProductShowcase({
  className,
  category,
  tabColor,
}: ProductsShowcaseProps) {
  const { getProductsInACategory } = useProduct()
  const { data, status } = useQuery(`get-products-in-${category}`, () =>
    getProductsInACategory(category)
  )
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
            <CategoryProductSlider products={data?.data} tabColor={tabColor} />
          )}
    </section>
  )
}
