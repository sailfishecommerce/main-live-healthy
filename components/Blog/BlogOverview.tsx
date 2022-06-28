import { useRouter } from 'next/router'

import BlogArticle from '@/components/Blog/BlogArticle'
import BlogAside from '@/components/Blog/BlogAside'
import PopularArticles from '@/components/Blog/PopularArticles'
import TableofContent from '@/components/Blog/TableofContent'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useArticleData from '@/hooks/useArticleData'
import useDatabaseData from '@/hooks/useDatabaseData'

export default function BlogOverview({ route }) {
  const { dbdata: Posts, loading } = useDatabaseData('articles/blog/post')

  const { databaseData } = useArticleData(`articles/blog/post/${route}/content`)

  const postsArray = Posts ? Object.entries(Posts) : []

  const filterPostArray = postsArray?.filter((post) => post[0] === route)
  const blogPost: any = filterPostArray[0]

  console.log('blogPost', blogPost)

  const blogPostContent: any = {}
  blogPostContent.content = blogPost ? JSON.parse(blogPost[1]?.content) : ''
  blogPostContent.title = blogPost ? JSON.parse(blogPost[1]?.title) : ''

  console.log('blogPostContent', blogPostContent)

  return (
    <main className="mx-auto container flex relative items-start justify-between">
      {loading && databaseData === null && blogPost === undefined ? (
        <SpinnerRipple centerRipple />
      ) : (
        <>
          {blogPost !== undefined && databaseData !== null && (
            <BlogArticle blogPost={blogPost} postContent={databaseData} />
          )}
          <BlogAside>
            <TableofContent blogPost={blogPostContent} />
            <div className="mb-14" />
            <PopularArticles blogPost={blogPostContent} />
          </BlogAside>
        </>
      )}
    </main>
  )
}
