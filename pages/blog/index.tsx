import dynamic from 'next/dynamic'

import BlogArticleExcerpt from '@/components/Blog/BlogArticleExcerpt'
import BlogBanner from '@/components/Blog/BlogBanner'
import blogContent from '@/json/blog-temp.json'
import Applayout from '@/layouts/app-layout'

const DynamicBlogGridSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BlogGridSlide' */ '@/components/Slider/BlogGridSlider'
    ),
  {
    ssr: false,
  }
)

const DynamicBlogPagination = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BlogPagination' */ '@/components/Blog/BlogPagination'
    ),
  {
    ssr: false,
  }
)

export default function Blog() {
  return (
    <Applayout title="Blog Gist">
      <BlogBanner />
      <div className="container mx-auto items-center justify-center pb-5 mb-2 md:mb-4">
        <DynamicBlogGridSlider />
        <hr className="mt-5" />
        <div className="pt-5 md:mt-2">
          <div className="flex flex-wrap mb-8">
            {blogContent.post.map((content) => (
              <BlogArticleExcerpt key={content.title} content={content} />
            ))}
          </div>
          <hr className="mb-4" />
          {/* <DynamicBlogPagination pagination={blogContent.pagination} /> */}
        </div>
      </div>
    </Applayout>
  )
}
