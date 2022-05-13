import { Splide, SplideSlide } from '@splidejs/react-splide'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'

import MobileSliderControls from '@/components/Slider/MobileSliderControls'
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

  return (
    <section className="mt-6 md:mb-12 mb-8 homepage-slider container mx-auto">
      <Splide onActive={(item) => setActiveIndex(item.index)}>
        {homepageSliderContent.map((content, index) => (
          <SplideSlide key={content.title}>
            <div className="content px-4 md:px-0 flex flex-col md:flex-row w-full h-100">
              <div className="text order-2 md:order-1 rounded-b-xl md:rounded-l-3xl bg-gray-100 p-6 md:p-8 w-full md:w-2/5 lg:w-1/4">
                <div className="top flex items-center mb-6 justify-between">
                  <h1 className="lg:text-2xl text-lg font-bold">
                    {content.title}
                  </h1>
                  <span className="font-normal text-red-500 bg-white rounded-md py-1 text-xs px-2 hover:bg-red-500 hover:text-white">
                    {content.category}
                  </span>
                </div>
                <p className="mb-2 text-sm">{content.description}</p>
                <Link passHref href="/collection">
                  <button
                    type="button"
                    aria-label="view collection"
                    className="view-collection rounded-md py-1 px-2 text-white mt-6 md:mt-12 2xl:mt-20"
                  >
                    View collection
                  </button>
                </Link>
                {mobileWidth && (
                  <MobileSliderControls
                    active={Number(index) + 1}
                    end={homepageSliderContent.length}
                  />
                )}
              </div>
              <div className="image order-1 md:order-2 w-full md:w-4/6 lg:w-3/4">
                <Image
                  priority
                  src={content.image}
                  height={500}
                  width={1300}
                  alt={content.title}
                  className="rounded-t-xl md:rounded-l-none md:rounded-r-3xl h-full"
                  layout="responsive"
                />
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      {!mobileWidth && (
        <DynamicHomepageSliderControls
          content={homepageSliderContent}
          activeIndex={activeIndex}
        />
      )}
      <style jsx>
        {`
          .view-collection {
            background-color: var(--mountain-green);
          }
          .view-collection:hover {
            background-color: var(--mountain-mist);
          }
        `}
      </style>
    </section>
  )
}

const HomepageSlider = memo(HomepageSliderComponent)
export default HomepageSlider
