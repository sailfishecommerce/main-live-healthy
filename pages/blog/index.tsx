import dynamic from 'next/dynamic'

import BlogBanner from '@/components/Blog/BlogBanner'
import Applayout from '@/layouts/app-layout'

const DynamicBlogGridSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BlogGridSlider' */ '@/components/Slider/BlogGridSlider'
    ),
  {
    ssr: false,
  }
)

const DynamicBlogArticleExcerpts = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BlogArticleExcerpts' */ '@/components/Blog/BlogArticleExcerpts'
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
        <DynamicBlogArticleExcerpts />
      </div>
    </Applayout>
  )
}
