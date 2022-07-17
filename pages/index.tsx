/**
 * Home page.
 */

import dynamic from 'next/dynamic'

import productshowcaseGroup from '@/json/productshowcase.json'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getStaticPropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

const Values = dynamic(
  () => import(/* webpackChunkName: 'Values' */ '@/components/Values'),
  { ssr: false }
)

const Applayout = dynamic(
  () => import(/* webpackChunkName: 'Applayout' */ '@/layouts/app-layout')
)

const HomepageSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'HomepageSlider' */ '@/components/Slider/HomepageSlider'
    ),
  { ssr: false }
)

const ProductShowcaseGroup = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductShowcaseGroup' */ '@/components/Product/ProductShowcaseGroup'
    ),
  { ssr: false }
)

const BestSellerSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BestSellerSlider' */ '@/components/Slider/BestSellerSlider'
    ),
  {
    ssr: false,
  }
)

const ShippingBanner = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ShippingBanner' */ '@/components/Banners/ShippingBanner'
    )
)

const ProductTabCarousel = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabCarousel' */ '@/components/Slider/ProductTabSlider'
    ),
  {
    ssr: false,
  }
)

const ProductBanner = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductsBanner' */ '@/components/Banners/ProductBanner'
    ),
  {
    ssr: false,
  }
)

export default function Home(props: SearchPageLayoutProps) {
  return (
    <Applayout title="Welcome to Livehealthy stores">
      <SearchPageLayout {...props}>
        <HomepageSlider />
        <Values />
        <ProductShowcaseGroup group={productshowcaseGroup[0]} />
        <ProductBanner />
        <ProductShowcaseGroup group={productshowcaseGroup[1]} />
        <BestSellerSlider />
        <ShippingBanner />
        <ProductShowcaseGroup group={productshowcaseGroup[2]} />
        <ProductTabCarousel />
        <div className="mb-6" />
      </SearchPageLayout>
    </Applayout>
  )
}

export const getStaticProps = () => getStaticPropsPage(Home)
