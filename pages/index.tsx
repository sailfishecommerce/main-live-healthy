import dynamic from 'next/dynamic'

import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  SearchPageLayout,
  getStaticPropsPage,
} from '@/layouts/search-page-layout'

const HomepageSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'HomepageSlider' */ '@/components/Slider/HomepageSlider'
    )
)

const Values = dynamic(
  () => import(/* webpackChunkName: 'Values' */ '@/components/Values')
)

const ProductShowcase = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductShowcase' */ '@/components/Product/ProductShowcase'
    ),
  {
    ssr: false,
  }
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

const ProductTabSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabSlider' */ '@/components/Slider/ProductTabSlider'
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

const TrustmateReview = dynamic(
  () =>
    import(
      /* webpackChunkName: 'TrustmateReview' */ '@/components/Reviews/TrustmateReview'
    )
)

export default function Home(props: SearchPageLayoutProps) {
  return (
    <Applayout title="Welcome to Livehealthy stores">
      <SearchPageLayout {...props}>
        <HomepageSlider />
        <Values />
        <ProductShowcase
          category="Health"
          className="lg:bg-gray-50"
          tabColor="#4017E0"
        />
        <ProductShowcase
          category="Personal Care"
          className="lg:bg-gray-50"
          tabColor="#C42340"
        />
        <ProductShowcase
          category="Confectionery"
          className="lg:bg-gray-50"
          tabColor="#50793E"
        />
        <ProductBanner />
        <ProductShowcase
          category="Beauty"
          className="lg:bg-gray-50"
          tabColor="#C47723"
        />
        <ProductShowcase
          category="Medical Aids"
          className="lg:bg-gray-50"
          tabColor="#C42340"
        />
        <BestSellerSlider />
        <ProductShowcase
          category="Veterinary and Pet Care"
          className="lg:bg-gray-50"
          tabColor="#C47723"
        />
        <ShippingBanner />
        <ProductShowcase
          category="Medicines"
          className="lg:bg-gray-50"
          tabColor="#E366B8"
        />
        <ProductShowcase
          category="Hair Colours"
          className="lg:bg-gray-50"
          tabColor="#C42340"
        />
        <ProductTabSlider />
        <TrustmateReview />
        <div className="mb-6" />
      </SearchPageLayout>
    </Applayout>
  )
}

export const getStaticProps = () => getStaticPropsPage(Home)
