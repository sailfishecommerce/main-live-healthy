import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

import Applayout from '@/layouts/app-layout'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import { getStaticPropsPage } from '@/layouts/search-page-layout'

const SearchPageLayout = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SearchPageLayout' */ '@/layouts/search-page-layout'
    )
)

const HomepageSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'HomepageSlider' */ '@/components/Slider/HomepageSlider'
    )
)

const Values = dynamic(
  () => import(/* webpackChunkName: 'Values' */ '@/components/Values')
)

const MainProductShowcase = dynamic(
  () =>
    import(
      /* webpackChunkName: 'MainProductShowcase' */ '@/components/Product/MainProductShowcase'
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
        <Configure
          hitsPerPage={15}
          // We cannot retrieve the user token at build time, so we disable perso
          // feature to avoid an additional call to retrieve Algolia results at load time
          enablePersonalization={false}
          userToken={undefined}
        />
        <HomepageSlider />
        <Values />
        <MainProductShowcase
          title="Weight Loss"
          indexId="weight_loss_product_type"
          query="weight loss"
          className="lg:bg-gray-50"
          tabColor="#4017E0"
        />
        <MainProductShowcase
          title="Sport Nutrition"
          indexId="sport_nutrition_product_type"
          query="Sport nutrition"
          tabColor="#C42340"
        />
        <ProductBanner />
        <MainProductShowcase
          title="Quit Smoking"
          indexId="quit_smoking_product_type"
          query="cigarette"
          className="lg:bg-gray-50"
          tabColor="#C47723"
        />
        <MainProductShowcase
          title="Health"
          indexId="health_product_type"
          query="health"
          tabColor="#50793E"
        />
        <ShippingBanner />
        <MainProductShowcase
          title="Hair Colours"
          indexId="hair_colours_product_type"
          query="hair colours"
          className="lg:bg-gray-50"
          tabColor="#E366B8"
        />
        <MainProductShowcase
          title="Medical Aids"
          indexId="medical_aid_product_type"
          query="medical aids"
          tabColor="#C42340"
        />
        <BestSellerSlider />
        <MainProductShowcase
          title="Confectionery"
          indexId="confectionery_product_type"
          query="confectionery"
          className="lg:bg-gray-50"
          tabColor="#50793E"
        />
        <MainProductShowcase
          title="Veterinary and Pet Care"
          indexId="veterinary_pet_care_product_type"
          query="veterinary"
          tabColor="#4017E0"
        />
        <ProductTabSlider />
        <TrustmateReview />
        <div className="mb-6" />
      </SearchPageLayout>
    </Applayout>
  )
}

export const getStaticProps = () => getStaticPropsPage(Home)
