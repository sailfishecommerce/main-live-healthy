import Link from 'next/link'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'
import { useEffect, useState } from 'react'

export default function BlogPosts() {
  const [loading, setLoading] = useState(false)
  const [blogPosts, setBlogPosts] = useState(null)

  function getPosts() {
    const { readFromDB } = firebaseDatabase()
    readFromDB('articles/blog/post', setBlogPosts, setLoading)
  }

  useEffect(() => {
    getPosts()
  }, [])

  console.log('blogPosts', blogPosts)

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
