/* eslint-disable react/no-array-index-key */
import Image from 'next/image'

import { formatBlogPost } from '@/utils/formatBlogPost'

export default function PopularArticles({ posts }: any) {
  const popularPosts = posts ? formatBlogPost(posts) : null
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">Popular Articles</h3>
      <ul>
        {popularPosts?.map((post, index) => (
          <li
            key={`${post.postImage}-${index}`}
            className="flex items-center my-4 hover:bg-gray-100 hover:rounded-md"
          >
            <Image
              src={post.postImage}
              alt={post.title}
              height={100}
              width={100}
              className="rounded-lg"
            />
            <p className="ml-3 font-medium">{post.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
