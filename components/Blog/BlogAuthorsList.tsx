/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import firebaseDatabase from '@/lib/firebaseDatabase'

export default function BlogAuthorsListComponent() {
  const [authors, setAuthors] = useState(null)
  const [loading, setLoading] = useState(false)

  function getAuthors() {
    const { readFromDB } = firebaseDatabase()
    readFromDB('articles/blog/blog-author', setAuthors, setLoading)
  }

  useEffect(() => {
    if (authors === null) {
      getAuthors()
    }
  }, [])

  const formattedAuthors = authors !== null ? Object.entries(authors) : []

  return (
    <div className="flex flex-col w-1/2">
      <h3 className="text-center text-xl"> Blog Author&#39;s Profile</h3>
      <ul className="p-0 mt-6">
        {formattedAuthors.map((formattedAuthorItem: any) => {
          const authorDetail: any = JSON.parse(formattedAuthorItem[1])
          console.log(
            'formattedAuthorItem',
            formattedAuthorItem,
            'authorDetail',
            authorDetail
          )
          return (
            <li key={formattedAuthorItem[0]} className="flex items-center my-4">
              <img
                src={authorDetail.url}
                width="100px"
                alt={authorDetail.name}
                height="100px"
                className="rounded-lg"
              />
              <div className="text flex flex-col ml-4">
                <h4 className="font-semibold text-lg">
                  {authorDetail.authorName}
                </h4>
                <p>{authorDetail.aboutAuthor}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
