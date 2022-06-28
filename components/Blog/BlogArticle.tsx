import BlogAuthor from '@/components/Blog/BlogAuthor'
import BlogContent from '@/components/Blog/BlogContent'
import ShareBlogLink from '@/components/Blog/ShareBlogLink'
import Breadcrumb from '@/components/Breadcrumb'
import breadcrumb from '@/json/breadcrumb.json'

export default function BlogArticle({ postContent, blogPost }: any) {
  const title = JSON.parse(blogPost[1].title)
  const author = JSON.parse(blogPost[1].author)
  const postDate = JSON.parse(blogPost[1].createdAt)

  return (
    <article className="lg:w-3/4 w-full lg:pr-12 px-4">
      <Breadcrumb breadcrumbItems={breadcrumb.blog} />
      <h1 className="blog-title text-3xl mb-8 font-bold">{title}</h1>
      <div className="row-1 items-center flex flex-col">
        <ShareBlogLink author={author} postDate={postDate} />
        <div className="blog-content">
          <BlogContent post={postContent} />
          <BlogAuthor author={author} />
        </div>
      </div>
    </article>
  )
}
