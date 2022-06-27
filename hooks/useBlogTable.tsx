import { useMemo } from 'react'

import useDatabaseData from '@/hooks/useDatabaseData'
import formatBlogData from '@/utils/formatBlogPost'

export default function useBlogTable() {
  const { dbdata: blogPosts, loading } = useDatabaseData('articles/blog/post')
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
