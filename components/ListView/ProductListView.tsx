/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'
import { forwardRef, memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'

import selectRandomColor from '@/lib/selectRandomColor'

interface Props {
  size: number
  randomColor: boolean
  productClassName: string
  tabColor?: string
  hits: any
}

const Product = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductCard' */ '@/components/Cards/ProductCard'
    ),
  {
    ssr: false,
  }
)

const mainStyle = { width: '100% !important' }

const ProductItem = memo(
  ({ data, index, randomColor, productClassName, tabColor }: any) => {
    const colorValue = randomColor ? selectRandomColor() : tabColor
    return (
      <Product
        key={index}
        color={colorValue}
        product={data[index]}
        className={productClassName}
      />
    )
  },
  areEqual
)

function ProductListViewComponent({
  size,
  hits,
  randomColor,
  tabColor,
  productClassName,
}: Props) {
  const innerElementType = forwardRef(({ style, ...rest }: any, ref) => {
    return (
      <div
        ref={ref}
        style={{ ...style, display: 'flex', width: '100%' }}
        {...rest}
      />
    )
  })
  return (
    <List
      height={400}
      itemSize={6}
      itemData={hits}
      className="w-full product-list-view"
      width={1000}
      style={mainStyle}
      innerElementType={innerElementType}
      itemCount={size}
      layout="horizontal"
    >
      {({ data, index }: any) => (
        <ProductItem
          index={index}
          randomColor={randomColor}
          data={data}
          productClassName={productClassName}
          tabColor={tabColor}
        />
      )}
    </List>
  )
}

const ProductListView = memo(ProductListViewComponent)
export default ProductListView
