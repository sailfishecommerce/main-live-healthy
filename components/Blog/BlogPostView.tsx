/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-onchange */
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import TextInput from '@/components/Form/TextInput'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useDatabaseData from '@/hooks/useDatabaseData'

const DynamicDashboardEditor = dynamic(
  () =>
    import(
      /* webpackChunkName: 'DashboardEditor' */ '@/components/Dashboard/DashboardEditor'
    ),
  {
    ssr: false,
  }
)

interface Props {
  postSlug: string
}

export default function BlogPostView({ postSlug }: Props) {
  const router = useRouter()
  const route = router.asPath.split('/admin/')[1]
  const [title, setTitle] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null)
  const { dbdata: blogAuthors, loading } = useDatabaseData(
    'articles/blog/blog-author'
  )
  const { dbdata: blogPost, loading: loadingBlogPost } = useDatabaseData(
    `articles/blog/post/${postSlug}`
  )
  const defaultTitle = blogPost ? JSON?.parse(blogPost?.title) : ''
  const author = blogPost ? JSON?.parse(blogPost?.author) : ''

  const postAuthor = selectedAuthor !== null ? selectedAuthor : author
  const postTitle = title.length === 0 ? defaultTitle : title

  useEffect(() => {
    if (title.length === 0) {
      setTitle(defaultTitle)
    }
  }, [title, defaultTitle])

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
    <>
      {loadingBlogPost ? (
        <SpinnerRipple centerRipple />
      ) : (
        <>
          <TextInput
            value={title}
            placeholder="Post title"
            className="w-full"
            label="Enter Blog Post Title"
            name="blogPostInput"
            onChange={(e) => setTitle(e.target.value)}
          />
          {selectedAuthor === null && typeof author === 'object' && (
            <div className="flex items-center mt-4">
              <img
                src={author.url}
                height="60px"
                width="60px"
                alt={author.authorName}
                className="rounded-full"
              />
              <h4 className="ml-4 font-semibold text-lg">
                {author.authorName}
              </h4>
            </div>
          )}

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
            blogPostTitle={postTitle}
            author={postAuthor}
            type="blog"
            title={postTitle.toUpperCase()}
            editPost={true}
          />
        </>
      )}
    </>
  )
}
