/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

export default function formatBlogData(blogPost: any) {
  const dataArray: any = []
  const blogPostArray: any = Object.entries(blogPost)
  blogPostArray.map((blogPostArr: any, index: number) => {
    const blogPostArray2 = Object.entries(blogPostArr)
    const formattedPost = formatPostArray(blogPostArray2)
    dataArray[index] = formatBlogPostItem(formattedPost[1])
  })
  return dataArray
}

function formatPostArray(blogPostArray2: any[]) {
  return blogPostArray2[1].map((blogPostItem: any) => {
    if (typeof blogPostItem === 'object') {
      const blogPostItemArray = Object.entries(blogPostItem)
      return blogPostItemArray
    }
  })
}

function formatBlogPostItem(formatBlogPostArray: any) {
  const data: any = {}
  formatBlogPostArray.map((blogPostArr: any) => {
    if (blogPostArr[0] === 'author') {
      data[blogPostArr[0]] = JSON.parse(blogPostArr[1]).authorName
    } else if (blogPostArr[0] === 'createdAt') {
      const parsedDate = JSON.parse(blogPostArr[1])
      const formatBlogDate = new Date(parsedDate).toDateString()
      data[blogPostArr[0]] = formatBlogDate
    } else if (blogPostArr[0] === 'content') {
      return null
    } else {
      data[blogPostArr[0]] = JSON.parse(blogPostArr[1])
    }
  })
  return data
}
