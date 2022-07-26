/* eslint-disable @next/next/no-img-element */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Link from 'next/link'
import { memo } from 'react'
import { GiAlarmClock } from 'react-icons/gi'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useBlogData from '@/hooks/useBlogData'
import '@splidejs/splide/dist/css/splide.min.css'
import toSlug from '@/lib/toSlug'

function BlogGridSliderComponent() {
  const { blogData, loading } = useBlogData()

  return (
    <div className="pt-4 mt-4 relative blogGrid lg:border rounded">
      {loading ? (
        <SpinnerRipple centerRipple />
      ) : (
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
          {blogData.length > 0 &&
            blogData?.map((content: any) => (
              <SplideSlide key={content.title}>
                <article className="w-full relative flex flex-col border lg:border-0 rounded">
                  <Link passHref href={`/blog/post/${toSlug(content.title)}`}>
                    <a
                      aria-label="date"
                      className="blog-entry-thumb mb-3 relative flex"
                    >
                      <button
                        aria-label="date"
                        type="button"
                        className="w-36 flex justify-center items-center rounded-md bg-gray-200 p-1 hover:bg-gray-600 hover:text-white absolute right-8 top-8"
                      >
                        <GiAlarmClock className="mr-1" />
                        {content.date}
                      </button>
                      <img
                        className="sliderPostImg rounded-md items-center lg:items-start"
                        src={content.postImg}
                        alt="Featured post"
                        height="500px"
                      />
                    </a>
                  </Link>
                  <div className="text-content flex flex-col lg:flex-row items-start lg:items-center px-5 w-full bottom-0 m-auto justify-between">
                    <div className="flex justify-between mb-2 pt-1 border-b lg:border-0  w-full pb-1">
                      <h2 className="lg:text-xl text-sm">
                        {content.title && (
                          <Link
                            passHref
                            href={`/blog/post/${toSlug(content.title)}`}
                          >
                            <a
                              aria-label="title"
                              className="font-semibold hover:text-red-500"
                            >
                              {content.title}
                            </a>
                          </Link>
                        )}
                      </h2>
                    </div>
                    <hr className="border" />
                    <div className="flex items-center">
                      <a
                        aria-label="author"
                        className="flex items-center text-sm blog-link"
                        href="#author"
                      >
                        <img
                          src={content.author.authorImg}
                          className="rounded-full mr-2"
                          alt={content.author}
                          width="50px"
                          height="50px"
                        />
                        {content.author.authorName}
                      </a>
                    </div>
                  </div>
                </article>
                <style jsx>
                  {`
                    .sliderPostImg {
                      height: 300px;
                      width: 98%;
                    }
                    @media (max-width: 768px) {
                      .sliderPostImg {
                        height: 200px;
                        width: 100%;
                      }
                    }
                  `}
                </style>
              </SplideSlide>
            ))}
        </Splide>
      )}
    </div>
  )
}

const BlogGridSlider = memo(BlogGridSliderComponent)
export default BlogGridSlider
