/* eslint-disable @next/next/no-img-element */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Link from 'next/link'
import { memo } from 'react'
import { BiMessageRoundedDots } from 'react-icons/bi'
import { GiAlarmClock } from 'react-icons/gi'

import carouselContent from '@/json/blog-grid-carousel.json'
import '@splidejs/splide/dist/css/splide.min.css'

function BlogGridSliderComponent() {
  return (
    <div className="pt-5 relative blogGrid">
      <Splide
        className="px-4"
        options={{
          perPage: 2,
          rewind: true,
          autoplay: true,
          type: 'loop',
          breakpoints: {
            450: {
              perPage: 1,
              gap: '1rem',
            },
            600: {
              perPage: 2,
              gap: '1.5rem',
            },
            1200: {
              perPage: 2,
              gap: '1.5rem',
            },
          },
        }}
      >
        {carouselContent.map((content) => (
          <SplideSlide key={content.title}>
            <article className="w-full relative flex flex-col">
              <Link passHref href={content.link}>
                <a
                  aria-label="date"
                  className="blog-entry-thumb mb-3 relative flex"
                >
                  <button
                    aria-label="date"
                    type="button"
                    className="w-24 flex justify-center items-center rounded-md bg-gray-200 p-1 hover:bg-gray-600 hover:text-white absolute right-8 top-8"
                  >
                    <GiAlarmClock className="mr-1" />
                    {content.date}
                  </button>
                  <img
                    className="sliderPostImg rounded-md"
                    src={content.image}
                    alt="Featured post"
                  />
                </a>
              </Link>
              <div className="text-content flex flex-col px-5 w-full bottom-0 m-auto justify-center">
                <div className="flex justify-between mb-2 pt-1">
                  <h2 className="text-xl">
                    <Link passHref href={content.link}>
                      <a aria-label="title">{content.title}</a>
                    </Link>
                  </h2>
                  <Link passHref href="/blog-single-sidebar#comments">
                    <a aria-label="comment" className="flex items-center">
                      <BiMessageRoundedDots className="mx-2" />
                      {content.comment}
                    </a>
                  </Link>
                </div>
                <div className="flex items-center">
                  <a
                    aria-label="author"
                    className="flex items-center text-sm"
                    href="#author"
                  >
                    <img
                      src={content.authorImage}
                      className="rounded-full mr-2"
                      alt={content.author}
                      width="50px"
                      height="50px"
                    />
                    {content.author}
                  </a>
                  <span className="blog-entry-meta-divider mx-1"></span>
                  <div className="flex items-center text-sm">
                    <span className="mr-1">in</span>
                    {content.category.map((category) => (
                      <a
                        aria-label="category"
                        href="#category"
                        key={category}
                        className="text-sm mx-1"
                      >
                        {category}
                      </a>
                    ))}
                    {content.category?.length > 1 ? ',' : ''}
                  </div>
                </div>
              </div>
            </article>
            <style jsx>
              {`
                .sliderPostImg {
                  height: 100%;
                  width: 98%;
                }
              `}
            </style>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

const BlogGridSlider = memo(BlogGridSliderComponent)
export default BlogGridSlider
