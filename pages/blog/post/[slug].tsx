import { useRouter } from 'next/router'

import BlogOverview from '@/components/Blog/BlogOverview'
import Applayout from '@/layouts/app-layout'

export default function Blog() {
  const router = useRouter()
  const route = router.asPath.split('/blog/post/')[1]
  return (
    <Applayout title="Blog Gist">
      {route && <BlogOverview route={route} />}
    </Applayout>
  )
}
