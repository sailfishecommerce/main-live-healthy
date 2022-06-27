import BlogArticle from '@/components/Blog/BlogArticle'
import BlogAside from '@/components/Blog/BlogAside'
import useDatabaseData from '@/hooks/useDatabaseData'

export default function BlogOverview() {
  const { dbdata: Posts, loading } = useDatabaseData('articles/blog/blog/post')

  console.log('Posts', Posts)

  return (
    <main className="mx-auto container flex relative items-start justify-between">
      <BlogArticle />
      <BlogAside />
    </main>
  )
}
