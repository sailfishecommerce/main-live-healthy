import Image from 'next/image'
import Link from 'next/link'

import toSlug from '@/lib/toSlug'

interface BlogExcerpt {
  content: {
    title: string
    author: {
      authorName: string
      authorImg: string
    }
    date: string
    postImg: string
  }
}

export default function BlogArticleExcerpt({ content }: BlogExcerpt) {
  return (
    <>
      <article
        key={content.title}
        className="px-4 py-2 w-full md:w-1/2 lg:w-1/3 md:px-2"
      >
        <Link passHref href={`/blog/post/${toSlug(content.title)}`}>
          <a aria-label={content.title} className="blog-entry-thumb">
            <Image
              className="rounded-t-lg"
              src={content.postImg}
              alt="Post"
              height={200}
              width={300}
              layout="responsive"
            />
          </a>
        </Link>
        <div className="border-2 w-full border-gray-100 border-t-0 rounded-t-none p-6 rounded-lg mb-4">
          <div>
            <h2 className="text-lg font-bold">
              <Link passHref href="/blog">
                <a>{content.title}</a>
              </Link>
            </h2>
          </div>
          <div className="border-t-2 border-gray-100 mt-6 pt-2 flex items-center justify-between">
            <div
              aria-label={`${content.author.authorName} image`}
              className="flex items-center"
            >
              <div className="blog-entry-author w-full">
                <Image
                  src={content.author.authorImg}
                  className="rounded-full ml-4"
                  alt={content.author.authorName}
                  height={50}
                  width={50}
                  layout="responsive"
                />
              </div>
              <span className="author-name ml-2">
                {content.author.authorName}
              </span>
            </div>
            <div className="flex items-center justify-between w-28">
              <a aria-label="date" className="text-sm" href="#date">
                {content.date}
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
