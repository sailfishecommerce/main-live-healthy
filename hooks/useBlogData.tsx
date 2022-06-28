/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react'

import useDatabaseData from '@/hooks/useDatabaseData'

export default function useBlogData() {
  const { dbdata, loading } = useDatabaseData('articles/blog/post/')
  const [blogData, setBlogData] = useState([])

  function getBlogData(dbData: any) {
    const dbDataArray = Object.entries(dbData)
    const imagesArray: any = []
    dbDataArray.map((dbArr1) => {
      const postData: any = {}
      const postObj: any = dbArr1[1]
      const postDataObj = JSON.parse(postObj.content)
      const postImage = postDataObj.entityMap['0'].data.src
      postData.description = postDataObj.blocks
      postData.postImg = postImage
      const authorObj = JSON.parse(postObj.author)
      postData.author = {
        authorName: authorObj.authorName,
        authorImg: authorObj.url,
      }
      const formatPostTitle = JSON.parse(postObj.title)
      postData.title = formatPostTitle
      const formatTime = JSON.parse(postObj.createdAt)
      const formattedDate = new Date(formatTime).toDateString()
      postData.date = formattedDate
      imagesArray.push(postData)
    })
    return imagesArray
  }

  useEffect(() => {
    if (blogData.length === 0 && dbdata !== null) {
      const tempBlogData = getBlogData(dbdata)
      setBlogData(tempBlogData)
    }
  }, [blogData, dbdata])

  return { blogData, loading }
}
