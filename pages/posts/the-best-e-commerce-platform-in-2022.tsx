import BlogOverview from '@/components/Blog/BlogOverview'
import Applayout from '@/layouts/app-layout'

export default function Blog() {
  return (
    <Applayout title="Blog Gist">
      <BlogOverview />
    </Applayout>
  )
}
