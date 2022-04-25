import BlogArticle from '@/components/Blog/BlogArticle'
import BlogAside from '@/components/Blog/BlogAside'

export default function BlogOverview() {
  return (
    <main className="mx-auto container flex relative items-start justify-between">
      <BlogArticle />
      <BlogAside />
    </main>
  )
}
