import ItemSlider from '@/components/Slider/ItemSlider'
import MemoizedTrendingProductRow from '@/components/Slider/TrendingProductRow'
import useSlider from '@/hooks/useSlider'

export default function TrendingProductSlider({
  products,
  tabColor,
  children,
}: any) {
  const { deviceWidth } = useSlider()

  return (
    <div className="group flex items-center justify-center mx-auto">
      <div className="flex items-start flex-col list-products-window">
        {children}
        <ItemSlider
          deviceWidth={deviceWidth}
          itemCount={products.length}
          itemData={{
            products,
            tabColor,
          }}
        >
          {MemoizedTrendingProductRow}
        </ItemSlider>
      </div>
    </div>
  )
}
