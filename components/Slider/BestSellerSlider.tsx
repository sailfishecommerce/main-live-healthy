/* eslint-disable no-nested-ternary */
import MemoizedBestSellerItem from '@/components/Slider/BestSellerItem'
import ItemSlider from '@/components/Slider/ItemSlider'
import useProductInRange from '@/hooks/useLivehealthyProduct'
import useSlider from '@/hooks/useSlider'

export default function BestSellerSlider() {
  const { deviceWidth, memoisedData } = useSlider()
  const [data, status] = useProductInRange({
    query: { $gt: 4 },
    id: 'bestSeller',
  })

  const memoisedProducts = status === 'success' ? memoisedData(data) : []

  return (
    <section className="itemSlider best-seller-slider py-4 px-4 xl:py-8 relative w-full bg-gray-platinum mx-auto flex relative z-10 flex-col my-4">
      <div className="container mb-0 xl:mb-8 mx-auto">
        <h1 className="font-bold text-xl md:text-3xl">Best Sellers</h1>
      </div>
      {status === 'error' ? (
        'unable to load products'
      ) : status === 'loading' ? (
        'loading'
      ) : (
        <div className="wrapper mx-auto flex items-center justify-center">
          <ItemSlider
            deviceWidth={deviceWidth}
            itemCount={memoisedProducts.length}
            itemData={{
              products: memoisedProducts,
            }}
          >
            {MemoizedBestSellerItem}
          </ItemSlider>
        </div>
      )}
    </section>
  )
}
