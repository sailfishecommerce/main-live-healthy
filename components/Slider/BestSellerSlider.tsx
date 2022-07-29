/* eslint-disable no-nested-ternary */
import LazyLoader from '@/components/Loader/LazyLoader'
import LoadProducts from '@/components/Loader/ProductsLoader'
import MemoizedBestSellerItem from '@/components/Slider/BestSellerItem'
import ItemSlider from '@/components/Slider/ItemSlider'
import useProductInRange from '@/hooks/useLivehealthyProduct'
import useSlider from '@/hooks/useSlider'

export default function BestSellerSlider() {
  const { deviceDimension, memoisedData } = useSlider()
  const [data, status] = useProductInRange({
    query: { $gt: 4 },
    id: 'bestSeller',
  })

  const memoisedProducts = status === 'success' ? memoisedData(data) : []

  return (
    <LazyLoader height={250} mobileHeight={200}>
      <>
        <section className="itemSlider best-seller-slider py-4 px-4 xl:py-8 relative  bg-gray-platinum mx-auto flex relative z-10 flex-col my-4">
          <div className="container mb-0 xl:mb-8 mx-auto">
            <h1 className="font-bold text-xl md:text-3xl mb-2">Best Sellers</h1>
          </div>
          {status === 'error' ? (
            'unable to load products'
          ) : status === 'loading' ? (
            <LoadProducts />
          ) : (
            <div className="wrapper mx-auto flex items-center justify-center">
              <ItemSlider
                deviceDimension={deviceDimension}
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
        <style jsx>
          {`
            .best-seller-slider {
              overflow-x: hidden;
            }
            @media (max-width: 768px) {
              .best-seller-slider {
                overflow-x: scroll;
              }
            }
          `}
        </style>
      </>
    </LazyLoader>
  )
}
