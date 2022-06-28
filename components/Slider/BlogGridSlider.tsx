/* eslint-disable array-callback-return */
/* eslint-disable @next/next/no-img-element */
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Link from 'next/link'
import { memo } from 'react'
import { GiAlarmClock } from 'react-icons/gi'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useDatabaseData from '@/hooks/useDatabaseData'
import '@splidejs/splide/dist/css/splide.min.css'
import toSlug from '@/lib/toSlug'

function BlogGridSliderComponent() {
  const { dbdata, loading } = useDatabaseData('articles/blog/post/')

  function getPostImages(dbData: any) {
    const dbDataArray = Object.entries(dbData)
    const imagesArray: any = []
    dbDataArray.map((dbArr1) => {
      const postData: any = {}
      const postObj: any = dbArr1[1]
      const postDataObj = JSON.parse(postObj.content)
      const postImage = postDataObj.entityMap['0'].data.src
      postData.postImg = postImage
      const authorObj = JSON.parse(postObj.author)
      postData.author = {
        authorName: authorObj.authorName,
        authorImg: authorObj.url,
      }
      const formatPostTitle = JSON.parse(postObj.title)
      postData.title = formatPostTitle
      const formatTime = JSON.parse(postObj.createdAt)
      const formattedDate = new Date(formatTime).toDateString()
      postData.date = formattedDate
      imagesArray.push(postData)
    })
    return imagesArray
  }

  const blogCarouselArray = dbdata !== null ? getPostImages(dbdata) : []

  return (
    <div className="pt-5 relative blogGrid">
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
          {blogCarouselArray.length > 0 &&
            blogCarouselArray.map((content: any) => (
              <SplideSlide key={content.title}>
                <article className="w-full relative flex flex-col">
                  <Link passHref href={toSlug(content.title)}>
                    <a
                      aria-label="date"
                      className="blog-entry-thumb mb-3 relative flex"
                    >
                      <button
                        aria-label="date"
                        type="button"
                        className="w-32 flex justify-center items-center rounded-md bg-gray-200 p-1 hover:bg-gray-600 hover:text-white absolute right-8 top-8"
                      >
                        <GiAlarmClock className="mr-1" />
                        {content.date}
                      </button>
                      <img
                        className="sliderPostImg rounded-md"
                        src={content.postImg}
                        alt="Featured post"
                        height="500px"
                      />
                    </a>
                  </Link>
                  <div className="text-content flex items-center px-5 w-full bottom-0 m-auto justify-between">
                    <div className="flex justify-between mb-2 pt-1">
                      <h2 className="text-xl">
                        {content.title && (
                          <Link passHref href={toSlug(content.title)}>
                            <a aria-label="title" className="font-semibold">
                              {content.title}
                            </a>
                          </Link>
                        )}
                      </h2>
                    </div>
                    <div className="flex items-center">
                      <a
                        aria-label="author"
                        className="flex items-center text-sm"
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
                      height: 400px;
                      width: 98%;
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
