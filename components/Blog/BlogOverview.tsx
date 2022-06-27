import { useRouter } from 'next/router'

import BlogArticle from '@/components/Blog/BlogArticle'
import BlogAside from '@/components/Blog/BlogAside'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useArticleData from '@/hooks/useArticleData'
import useDatabaseData from '@/hooks/useDatabaseData'

export default function BlogOverview() {
  const { dbdata: Posts, loading } = useDatabaseData('articles/blog/post')

  const router = useRouter()
  const route = router.asPath.split('/blog/post/')[1]
  const { databaseData } = useArticleData(`articles/blog/post/${route}/content`)

  const postsArray = Posts ? Object.entries(Posts) : []

  const filterPostArray = postsArray.filter((post) => post[0] === route)
  const blogPost = filterPostArray[0]

  return (
    <main className="mx-auto container flex relative items-start justify-between">
      {loading && databaseData === null && blogPost === undefined ? (
        <SpinnerRipple centerRipple />
      ) : (
        <>
          {blogPost !== undefined && databaseData !== null && (
            <BlogArticle blogPost={blogPost} postContent={databaseData} />
          )}
          <BlogAside />
        </>
      )}
    </main>
  )
}
