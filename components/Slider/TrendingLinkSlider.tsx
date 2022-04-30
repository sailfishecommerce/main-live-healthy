import { Splide, SplideSlide } from '@splidejs/react-splide'

import { TrendLink } from '@/components/Menu/TrendingLinks'
import '@splidejs/splide/dist/css/splide.min.css'
import useCategoryData from '@/hooks/useCategoryData'

export default function TrendingLinkSlider() {
  const [data, status] = useCategoryData()

  const categories = status === 'success' ? data?.results.slice(12, 20) : []

  return (
    <div className="trending-slider">
      <h1 className="mb-3 font-bold text-xl">Trending</h1>
      <Splide
        options={{
          perPage: 4,
          padding: '2rem',
          breakpoints: {
            500: {
              perPage: 3,
            },
            800: {
              perPage: 3,
            },
            1200: {
              perPage: 4,
            },
          },
        }}
        className="mx-auto container trendingLinks"
      >
        {categories.map((trendingItem: any) => (
          <SplideSlide key={trendingItem.slug}>
            <TrendLink trendingItem={trendingItem} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
