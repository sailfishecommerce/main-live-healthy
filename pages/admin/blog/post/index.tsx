/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-onchange */
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
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null)
  const [loading, setLoading] = useState(null)

  const router = useRouter()
  const route = router.asPath.split('/admin/')[1]

  function readDataFromDB() {
    const { readFromDB } = firebaseDatabase()
    readFromDB('articles/blog/blog-author', setBlogAuthors, setLoading)
  }

  useEffect(() => {
    if (blogAuthors === null) {
      readDataFromDB()
    }
  }, [])

  const blogAuthorsArray =
    blogAuthors !== null ? Object.entries(blogAuthors) : []

  function selectHandler(e: any) {
    const selectedAuthorArray: any = blogAuthorsArray.filter(
      (blogAuthorItem: any) =>
        JSON.parse(blogAuthorItem[1]).authorName === e.target.value
    )
    const formattedSelectedAuthor = JSON?.parse(selectedAuthorArray[0][1])
    setSelectedAuthor(formattedSelectedAuthor)
  }

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

        <div className="mt-4 flex items-center">
          <span className="font-bold mr-2">Author:</span>
          {selectedAuthor !== null && (
            <div className="flex items-center">
              <img
                src={selectedAuthor.url}
                height="60px"
                width="60px"
                alt={selectedAuthor.authorName}
                className="rounded-full"
              />
              <h4 className="ml-4 font-semibold text-lg">
                {selectedAuthor.authorName}
              </h4>
            </div>
          )}
        </div>

        {!loading && loading !== null && (
          <select
            value={selectedAuthor?.authorName}
            className="mt-4 p-2"
            onChange={selectHandler}
          >
            <option className="text-bold">Select Author</option>
            {blogAuthorsArray.map((blogAuthor: [string, any | unknown]) => {
              const formattedBlogAuthor = JSON.parse(blogAuthor[1])
              return (
                <option
                  value={formattedBlogAuthor.authorName}
                  key={blogAuthor[0]}
                  className="text-bold"
                >
                  {formattedBlogAuthor.authorName}
                </option>
              )
            })}
          </select>
        )}
        <div className="mb-8" />
        <DynamicDashboardEditor
          editorKey={route}
          blogPostTitle={title}
          author={selectedAuthor}
          type="blog"
        />
      </DashboardMainView>
    </DashboardLayout>
  )
}
