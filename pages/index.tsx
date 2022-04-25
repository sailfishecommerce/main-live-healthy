import dynamic from 'next/dynamic'
import { Configure } from 'react-instantsearch-dom'

import ShippingBanner from '@/components/Banners/ShippingBanner'
import Pagetitle from '@/components/Header/page-title'
import { ProductsShowcase } from '@/components/Product/ProductsShowcase'
import { ProductCardHitShowcase } from '@/components/ProductCard/product-card-hit'
import ProductReviews from '@/components/Reviews/ProductReviews'
import HomepageSlider from '@/components/Slider/HomepageSlider'
import Values from '@/components/Values'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getStaticPropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

const ProductBanner = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductsBanner' */ '@/components/Banners/ProductBanner'
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

const ProductTabSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductTabSlider' */ '@/components/Slider/ProductTabSlider'
    ),
  {
    ssr: false,
  }
)

export default function Home(props: SearchPageLayoutProps) {
  return (
    <SearchPageLayout {...props}>
      <Pagetitle title="Welcome to Livehealthy stores" />
      <Configure
        hitsPerPage={5}
        // We cannot retrieve the user token at build time, so we disable perso
        // feature to avoid an additional call to retrieve Algolia results at load time
        enablePersonalization={false}
        userToken={undefined}
      />
      <HomepageSlider />
      <Values />
      <ProductsShowcase
        title="Weight Loss"
        indexId="weight_loss_product_type"
        query="weight loss"
        className="lg:bg-gray-50"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Sport Nutrition"
        indexId="sport_nutrition_product_type"
        query="Sport nutrition"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductBanner />
      <ProductsShowcase
        title="Quit Smoking"
        indexId="quit_smoking_product_type"
        query="cigarette"
        className="lg:bg-gray-50"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Health"
        indexId="health_product_type"
        query="health"
        hitComponent={ProductCardHitShowcase}
      />
      <ShippingBanner />
      <ProductsShowcase
        title="Hair Colours"
        indexId="hair_colours_product_type"
        query="hair colours"
        className="lg:bg-gray-50"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Medical Aids"
        indexId="medical_aid_product_type"
        query="medical aids"
        hitComponent={ProductCardHitShowcase}
      />
      <BestSellerSlider />
      <ProductsShowcase
        title="Confectionery"
        indexId="confectionery_product_type"
        query="confectionery"
        className="lg:bg-gray-50"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Veterinary and Pet Care"
        indexId="veterinary_pet_care_product_type"
        query="veterinary"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductTabSlider />
      <ProductReviews />
    </SearchPageLayout>
  )
}

export const getStaticProps = () => getStaticPropsPage(Home)
