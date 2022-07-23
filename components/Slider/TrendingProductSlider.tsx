import ItemSlider from '@/components/Slider/ItemSlider'
import MemoizedTrendingProductRow from '@/components/Slider/TrendingProductRow'
import useSlider from '@/hooks/useSlider'

export default function TrendingProductSlider({
  products,
  tabColor,
  children,
}: any) {
  const { deviceDimension } = useSlider()

  return (
    <>
      <div className="flex items-start flex-col list-products-window">
        <div className="tag-view">{children}</div>
        <ItemSlider
          deviceDimension={deviceDimension}
          itemCount={products.length}
          itemData={{
            products,
            tabColor,
          }}
        >
          {MemoizedTrendingProductRow}
        </ItemSlider>
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .list-products-window {
              width: 100%;
              overflow-x: scroll;
            }
          }
        `}
      </style>
    </>
  )
}
