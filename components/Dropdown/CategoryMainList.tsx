import AlgoliaCategories from '@/components/Algolia/AlgoliaCategories'
import TrendingLinkSlider from '@/components/Slider/TrendingLinkSlider'

export default function CategoryMainList() {
  return (
    <div className="category-main mb-8 w-4/5 px-6">
      <TrendingLinkSlider />
      <AlgoliaCategories />
    </div>
  )
}
