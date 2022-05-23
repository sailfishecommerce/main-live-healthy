import { Splide, SplideSlide } from '@splidejs/react-splide'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'

import { useMediaQuery } from '@/hooks'
import homepageSliderContent from '@/json/homepage-slider.json'

import '@splidejs/splide/dist/css/splide.min.css'

const DynamicHomepageSliderControls = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'HomepageSliderControls' */ '@/components/Slider/HomepageSliderControls'
    )
)

const MobileSliderControls = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'MobileSliderControls' */ '@/components/Slider/MobileSliderControls'
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
    <section className="mt-6 md:px-4 px-0 xl:px-0 xl:mb-12 mb-2 lg:mb-8 homepage-slider container mx-auto">
      <Splide onActive={(item) => setActiveIndex(item.index)}>
        {homepageSliderContent.map((content, index) => (
          <SplideSlide key={content.title}>
            <Link passHref href={content.link}>
              <a className="content px-4 md:px-0 flex flex-col md:flex-row w-full h-100">
                <div className="text order-2 md:order-1 rounded-b-xl my-0 md:rounded-l-3xl bg-gray-100 p-6 lg:p-8 w-full md:w-2/5 lg:w-1/4">
                  <div className="top flex items-center mb-6 justify-between">
                    <h1 className="lg:text-2xl text-lg font-bold">
                      {content.title}
                    </h1>
                    <span className="font-normal text-red-500 bg-white rounded-md py-1 text-xs px-2 hover:bg-red-500 hover:text-white">
                      {content.category}
                    </span>
                  </div>
                  <p className="mb-2 text-sm lg:text-md xl:text-lg">
                    {content.description}
                  </p>
                  <Link passHref href="/collection">
                    <button
                      type="button"
                      aria-label="view collection"
                      className="view-collection rounded-md py-1 px-2 text-white mt-6 md:mt-12 lg:mt-6 2xl:mt-20"
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
                <div className="my-0 image order-1 md:order-2 w-full md:w-4/6 lg:w-3/4">
                  <Image
                    priority={true}
                    src={content.image}
                    height={imageDimension.height}
                    width={imageDimension.width}
                    alt={content.title}
                    className="rounded-t-xl md:rounded-l-none md:rounded-r-3xl"
                    layout="responsive"
                  />
                </div>
              </a>
            </Link>
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
