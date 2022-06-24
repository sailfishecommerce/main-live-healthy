import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import TextInput from '@/components/Form/TextInput'
import DashboardLayout from '@/layouts/dashboard-layout'

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
  const router = useRouter()
  const route = router.asPath.split('/admin/')[1]
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
