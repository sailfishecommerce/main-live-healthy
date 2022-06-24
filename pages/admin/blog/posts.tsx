import Link from 'next/link'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function BlogPosts() {
  return (
    <DashboardLayout title="Blog page">
      <DashboardMainView>
        <div className="flex blog-post justify-center relative">
          <h3 className="text-center text-xl">No Blog post yet</h3>
          <Link passHref href="/admin/blog/post">
            <button
              className="bg-mountain-green absolute right-20 p-2 text-white rounded-lg"
              type="button"
            >
              Create Blog Post
            </button>
          </Link>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
