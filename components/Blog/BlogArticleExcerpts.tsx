import BlogArticleExcerpt from '@/components/Blog/BlogArticleExcerpt'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useBlogData from '@/hooks/useBlogData'

export default function BlogArticleExcerpts() {
  const { blogData, loading } = useBlogData()

  return (
    <div className="pt-5 md:mt-2">
      <div className="flex flex-wrap mb-8">
        {loading ? (
          <SpinnerRipple centerRipple />
        ) : (
          blogData?.map((content: any) => (
            <BlogArticleExcerpt key={content.title} content={content} />
          ))
        )}
      </div>
      <hr className="mb-4" />
      {/* <DynamicBlogPagination pagination={blogContent.pagination} /> */}
    </div>
  )
}
