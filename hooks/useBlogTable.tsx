import { useMemo, useState } from 'react'

import firebaseDatabase from '@/lib/firebaseDatabase'
import formatBlogData from '@/utils/formatBlogPost'

export default function useBlogTable() {
  const [loading, setLoading] = useState(false)
  const [blogPosts, setBlogPosts] = useState(null)

  function getPosts() {
    const { readFromDB } = firebaseDatabase()
    readFromDB('articles/blog/post', setBlogPosts, setLoading)
  }

  useMemo(() => {
    if (blogPosts === null) {
      getPosts()
    }
  }, [blogPosts])

  const data = blogPosts !== null ? formatBlogData(blogPosts) : undefined

  const columns = useMemo(
    () => [
      { Header: 'TITLE', accessor: 'title' },
      { Header: 'AUTHOR', accessor: 'author' },
      { Header: 'CREATED DATE', accessor: 'createdAt' },
    ],
    []
  )

  return {
    columns,
    data,
    loading,
  }
}
