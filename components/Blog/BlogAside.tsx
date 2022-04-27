import PopularArticles from '@/components/Blog/PopularArticles'
import TableofContent from '@/components/Blog/TableofContent'

export default function BlogAside() {
  return (
    <aside className="w-1/4 hidden lg:flex lg:flex-col mt-52 sticky top-24 z-30 right-24">
      <TableofContent />
      <div className="mb-14" />
      <PopularArticles />
    </aside>
  )
}
