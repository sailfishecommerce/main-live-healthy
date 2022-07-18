import dynamic from 'next/dynamic'

import LazyLoader from '@/components/Loader/LazyLoader'
// import ProductTabSliderDropdown from '@/components/Slider/ProductTabSliderDropdown'
// import ProductTabSlider from './ProductTabSlider'

const ProductTabSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabSlider' */ '@/components/Slider/ProductTabSlider'
    ),
  {
    ssr: false,
  }
)

const ProductTabSliderDropdown = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabSliderDropdown' */ '@/components/Slider/ProductTabSliderDropdown'
    ),
  {
    ssr: false,
  }
)

export default function ProductTabs() {
  return (
    <LazyLoader height={250} mobileHeight={200}>
      <section className="itemSlider py-2 lg:py-6 product-tab-slider items-start container">
        <ProductTabSliderDropdown />
        <ProductTabSlider />
        <style jsx>
          {`
            .itemSlider {
              margin: 10px auto;
            }
            @media (max-width: 768px) {
              .itemSlider {
                overflow-x: scoll;
                margin: 10px 0px;
              }
            }
          `}
        </style>
      </section>
    </LazyLoader>
  )
}
