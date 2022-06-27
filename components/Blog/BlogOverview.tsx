import { useRouter } from 'next/router'

import BlogArticle from '@/components/Blog/BlogArticle'
import BlogAside from '@/components/Blog/BlogAside'
import useArticleData from '@/hooks/useArticleData'
import useDatabaseData from '@/hooks/useDatabaseData'

export default function BlogOverview() {
  const { dbdata: Posts, loading } = useDatabaseData('articles/blog/post')

  const router = useRouter()
  const route = router.asPath.split('/posts/')[1]
  const { databaseData } = useArticleData(`articles/blog/post/${route}/content`)

  const postsArray = Posts ? Object.entries(Posts) : []

  const filterPostArray = postsArray.filter((post) => post[0] === route)

  console.log('filterPostArray', filterPostArray)
  console.log('databaseData', databaseData)

  return (
    <main className="mx-auto container flex relative items-start justify-between">
      <BlogArticle />
      <BlogAside />
    </main>
  )
}
