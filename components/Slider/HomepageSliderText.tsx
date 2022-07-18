import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

import { useMediaQuery } from '@/hooks'
import homepageSliderContent from '@/json/homepage-slider.json'

import '@splidejs/splide/dist/css/splide.min.css'

const MobileSliderControls = dynamic<any>(
  () =>
    import(
      /* webpackChunkName: 'MobileSliderControls' */ '@/components/Slider/MobileSliderControls'
    )
)

interface Props {
  index: number
  content: {
    link: string
    title: string
    category: string
    description: string
  }
}

export default function HomepageSliderText({
  children,
  content,
  index,
}: PropsWithChildren<Props>) {
  const mobileWidth = useMediaQuery('(max-width:768px)')

  return (
    <>
      <Link passHref href={content.link}>
        <a className="home-slider content px-4 md:px-0 flex flex-col md:flex-row w-full h-100">
          <div className="text order-2 md:order-1 rounded-b-xl lg:rounded-r-none my-0 md:rounded-l-3xl bg-gray-100 p-6 lg:p-8 w-full md:w-2/5 lg:w-1/4">
            <div className="top flex items-center mb-6 justify-between">
              <h1 className="lg:text-2xl text-lg font-bold">{content.title}</h1>
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
          <div className="my-0 image order-1 md:order-2 w-full h-full md:w-4/6 lg:w-3/4">
            {children}
          </div>
        </a>
      </Link>
      <style jsx>
        {`
          .view-collection {
            background-color: var(--color-1);
          }
          .view-collection:hover {
            background-color: var(--color-2);
          }
          .content .order-2 {
            border-bottom-right-radius: 0px;
          }
        `}
      </style>
    </>
  )
}
