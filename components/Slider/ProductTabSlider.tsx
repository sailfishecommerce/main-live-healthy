/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'

import ProductTabLoader from '@/components/Loader/ProductTabLoader'
import ItemSlider from '@/components/Slider/ItemSlider'
import MemoizeProductSliderItem from '@/components/Slider/ProductSliderItem'
import ProductTabSliderDropdown from '@/components/Slider/ProductTabSliderDropdown'
import useProductInRange from '@/hooks/useLivehealthyProduct'
import useSlider from '@/hooks/useSlider'
import { productRatingAtom } from '@/lib/atomConfig'
import '@splidejs/splide/dist/css/splide.min.css'

export default function ProductTabSlider() {
  const [productRating] = useAtom(productRatingAtom)
  const { productTabWidth, memoisedData } = useSlider()

  let query
  if (productRating === 3) {
    query = { query: { $lt: 3 }, id: 'newProducts' }
  } else if (productRating === 4) {
    query = { query: { $eq: 4 }, id: 'featuredProducts' }
  } else {
    query = { query: { $eq: 5 }, id: 'specialProducts' }
  }
  const [data, status] = useProductInRange(query)

  const memoisedProducts = status === 'success' ? memoisedData(data) : []

  return (
    <section className="itemSlider py-2 lg:py-6 product-tab-slider items-start container">
      <ProductTabSliderDropdown />
      <div className="tab-products mt-0 flex items-center">
        {status === 'error' ? (
          'unable to load products'
        ) : status === 'loading' ? (
          <ProductTabLoader />
        ) : (
          <div className="slide-view">
            <ItemSlider
              deviceWidth={productTabWidth}
              itemCount={memoisedProducts.length}
              itemData={{
                products: memoisedProducts,
              }}
            >
              {MemoizeProductSliderItem}
            </ItemSlider>
          </div>
        )}
      </div>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .slide-view {
              margin: 20px 0%;
            }
            .itemSlider {
              margin: 10px 20px;
            }
          }
        `}
      </style>
    </section>
  )
}
