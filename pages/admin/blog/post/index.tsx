import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import TextInput from '@/components/Form/TextInput'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'

const DynamicDashboardEditor = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DashboardEditor' */ '@/components/Dashboard/DashboardEditor'
    ),
  {
    ssr: false,
  }
)

export default function BlogPost() {
  const [title, setTitle] = useState('')
  const [blogAuthors, setBlogAuthors] = useState(null)
  const [loading, setLoading] = useState(null)
  const router = useRouter()
  const route = router.asPath.split('/admin/')[1]

  function readDataFromDB() {
    const { readFromDB } = firebaseDatabase()
    readFromDB('articles/blog/blog-author', setBlogAuthors, setLoading)
  }

  console.log('blogAuthors', blogAuthors)

  useEffect(() => {
    if (blogAuthors === null) {
      readDataFromDB()
    }
  }, [])

  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView>
        <TextInput
          value={title}
          placeholder="Post title"
          className="w-full"
          label="Enter Blog Post Title"
          name="blogPostInput"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select className="mt-4 p-2">
          <option className="text-bold">Select Author</option>
        </select>
        <div className="mb-8" />
        <DynamicDashboardEditor
          editorKey={route}
          blogPostTitle={title}
          type="blog"
        />
      </DashboardMainView>
    </DashboardLayout>
  )
}
