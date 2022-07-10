/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'
import Link from 'next/link'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useBlogTable from '@/hooks/useBlogTable'
import DashboardLayout from '@/layouts/dashboard-layout'

const DynamicBlogTable = dynamic(
  () =>
    import(/* webpackChunkName: 'BlogTable' */ '@/components/Blog/BlogTable')
)

export default function BlogPosts() {
  const { loading, columns, data } = useBlogTable()

  return (
    <DashboardLayout title="Blog page">
      <DashboardMainView>
        <div className="flex blog-post flex-col justify-center relative">
          <Link passHref href="/admin/blog/post">
            <button
              className="bg-mountain-green items-end w-40 right-20 p-2 text-white rounded-lg"
              type="button"
            >
              Create Blog Post
            </button>
          </Link>
          {loading ? (
            <SpinnerRipple centerRipple />
          ) : data !== undefined && data?.length > 0 ? (
            <DynamicBlogTable data={data} columns={columns} />
          ) : (
            data?.length === 0 && (
              <h3 className="text-center text-xl">No Blog post yet</h3>
            )
          )}
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
