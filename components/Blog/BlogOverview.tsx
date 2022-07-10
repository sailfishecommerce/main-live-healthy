import dynamic from 'next/dynamic'

import BlogAside from '@/components/Blog/BlogAside'
import PopularArticles from '@/components/Blog/PopularArticles'
import TableofContent from '@/components/Blog/TableofContent'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useArticleData from '@/hooks/useArticleData'
import useDatabaseData from '@/hooks/useDatabaseData'

const DynamicBlogArticle = dynamic(
  () =>
    import(
      /* webpackChunkName: 'BlogArticle' */ '@/components/Blog/BlogArticle'
    )
)

interface Props {
  route: string
}

export default function BlogOverview({ route }: Props) {
  const { dbdata: Posts, loading } = useDatabaseData('articles/blog/post')

  const { databaseData } = useArticleData(`articles/blog/post/${route}/content`)

  const postsArray = Posts ? Object.entries(Posts) : []

  const filterPostArray = postsArray?.filter((post) => post[0] === route)
  const blogPost: any = filterPostArray[0]

  const blogPostContent: any = {}
  blogPostContent.content = blogPost ? JSON.parse(blogPost[1]?.content) : ''
  blogPostContent.title = blogPost ? JSON.parse(blogPost[1]?.title) : ''

  return (
    <main className="mx-auto container flex relative items-start justify-between">
      {loading && databaseData === null && blogPost === undefined ? (
        <SpinnerRipple centerRipple />
      ) : (
        <>
          {blogPost !== undefined && databaseData !== null && (
            <DynamicBlogArticle
              blogPost={blogPost}
              postContent={databaseData}
            />
          )}
          <BlogAside>
            <TableofContent blogPost={blogPostContent} />
            <div className="mb-14" />
            <PopularArticles posts={Posts} />
          </BlogAside>
        </>
      )}
    </main>
  )
}
