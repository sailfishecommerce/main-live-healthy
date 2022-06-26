/* eslint-disable no-nested-ternary */
import Link from 'next/link'

import BlogTable from '@/components/Blog/BlogTable'
import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useBlogTable from '@/hooks/useBlogTable'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function BlogPosts() {
  const { loading, columns, data } = useBlogTable()

  return (
    <DashboardLayout title="Blog page">
      <DashboardMainView>
        <div className="flex blog-post justify-center relative">
          <Link passHref href="/admin/blog/post">
            <button
              className="bg-mountain-green absolute right-20 p-2 text-white rounded-lg"
              type="button"
            >
              Create Blog Post
            </button>
          </Link>
        </div>
        {loading ? (
          <SpinnerRipple centerRipple />
        ) : data !== undefined && data?.length > 0 ? (
          <BlogTable data={data} columns={columns} />
        ) : (
          data?.length === 0 && (
            <h3 className="text-center text-xl">No Blog post yet</h3>
          )
        )}
      </DashboardMainView>
    </DashboardLayout>
  )
}
