import { Splide, SplideSlide } from '@splidejs/react-splide'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, useState } from 'react'

import LazyLoader from '@/components/Loader/LazyLoader'
import HomepageSliderText from '@/components/Slider/HomepageSliderText'
import { useMediaQuery } from '@/hooks'
import homepageSliderContent from '@/json/homepage-slider.json'
import '@splidejs/splide/dist/css/splide.min.css'

const DynamicHomepageSliderControls = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'HomepageSliderControls' */ '@/components/Slider/HomepageSliderControls'
    )
)

function HomepageSliderComponent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const tabletWidth = useMediaQuery('(max-width:1024px)')
  const imageDimension = tabletWidth
    ? {
        height: 650,
        width: 1300,
      }
    : {
        height: 650,
        width: 1300,
      }

  return (
    <LazyLoader height={530} mobileHeight={450}>
      <section className="mt-6 md:px-4 px-0 xl:px-0 xl:mb-12 mb-2 lg:mb-8 homepage-slider container mx-auto">
        <Splide id="splide" onActive={(item) => setActiveIndex(item.index)}>
          {homepageSliderContent.map((content, index) => (
            <SplideSlide key={content.title}>
              <HomepageSliderText index={index} content={content}>
                <Image
                  priority={true}
                  src={content.image}
                  height={imageDimension.height}
                  width={imageDimension.width}
                  alt={content.title}
                  className="rounded-t-xl md:rounded-l-none md:rounded-r-3xl"
                  layout="responsive"
                />
              </HomepageSliderText>
            </SplideSlide>
          ))}
        </Splide>
        {!mobileWidth && (
          <DynamicHomepageSliderControls
            content={homepageSliderContent}
            activeIndex={activeIndex}
          />
        )}
      </section>
    </LazyLoader>
  )
}

const HomepageSlider = memo(HomepageSliderComponent)
export default HomepageSlider
