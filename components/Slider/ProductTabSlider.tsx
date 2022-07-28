/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'

import ProductTabLoader from '@/components/Loader/ProductTabLoader'
import ItemSlider from '@/components/Slider/ItemSlider'
import MemoizeProductSliderItem from '@/components/Slider/ProductSliderItem'
import useProductInRange from '@/hooks/useLivehealthyProduct'
import useSlider from '@/hooks/useSlider'
import { productRatingAtom } from '@/lib/atomConfig'

export default function ProductTabSlider() {
  const [productRating] = useAtom(productRatingAtom)
  const { productTabDimension, memoisedData } = useSlider()

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
    <>
      <div className="tab-products mt-0 flex items-center">
        {status === 'error' ? (
          'unable to load products'
        ) : status === 'loading' ? (
          <ProductTabLoader height={100} />
        ) : (
          <div className="slide-view">
            <ItemSlider
              deviceDimension={productTabDimension}
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
          .slide-view {
            overflow-x: hidden;
          }
          @media (max-width: 768px) {
            .slide-view {
              margin: 20px 0%;
            }
          }
        `}
      </style>
    </>
  )
}
