/* eslint-disable @next/next/no-img-element */

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useDatabaseData from '@/hooks/useDatabaseData'

export default function BlogAuthorsListComponent() {
  const { dbdata: authors, loading } = useDatabaseData(
    'articles/blog/blog-author'
  )

  const formattedAuthors = authors !== null ? Object.entries(authors) : []

  return (
    <div className="flex flex-col w-1/2">
      <h3 className="text-center text-xl"> Blog Author&#39;s Profile</h3>
      {loading ? (
        <SpinnerRipple centerRipple />
      ) : (
        <ul className="p-0 mt-6">
          {formattedAuthors.map((formattedAuthorItem: any) => {
            const authorDetail: any = JSON.parse(formattedAuthorItem[1])

            return (
              <li
                key={formattedAuthorItem[0]}
                className="flex items-center my-4"
              >
                <img
                  src={authorDetail.url}
                  width="80px"
                  alt={authorDetail.name}
                  height="80px"
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
      )}
    </div>
  )
}
