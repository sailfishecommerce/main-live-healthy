import Image from 'next/image'
import Link from 'next/link'

import Icons from '@/components/Icons'

interface BlogExcerpt {
  content: {
    title: string
    text: string
    tags: string[]
    author: string
    authorImage: string
    date: string
    image?: string
    comment: number
  }
}

export default function BlogArticleExcerpt({ content }: BlogExcerpt) {
  return (
    <>
      {content.image ? (
        <article
          key={content.title}
          className="px-4 py-2 w-full md:w-1/2 lg:w-1/3 md:px-2"
        >
          <Link passHref href="/blog">
            <a aria-label={content.title} className="blog-entry-thumb">
              <Image
                className="rounded-t-lg"
                src={content.image}
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
              <p className="text-md">{content.text}</p>
              <div className="flex my-2">
                {content.tags.map((tag) => (
                  <a
                    key={tag}
                    className="border-2 border-gray-100 p-2 text-sm hover:text-white hover:bg-red-500 rounded-md mx-2"
                    href="#tag"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-gray-100 mt-6 pt-2 flex items-center justify-between">
              <a
                aria-label={`${content.author} image`}
                className="flex items-center"
                href="#tag"
              >
                <div className="blog-entry-author-ava w-full">
                  <Image
                    src={content.authorImage}
                    className="rounded-full ml-4"
                    alt={content.author}
                    height={50}
                    width={50}
                    layout="responsive"
                  />
                </div>
                {content.author}
              </a>
              <div className="flex items-center justify-between w-28">
                <a aria-label="date" className="text-sm" href="#date">
                  {content.date}
                </a>
                <span className="mx-1 border-r-2 border-gray-200 h-6"></span>
                <Link passHref href="#comments">
                  <a aria-label="comment" className="text-sm flex items-center">
                    <Icons
                      className="mx-2 text-red-500"
                      size={20}
                      icon="mail"
                    />
                    {content.comment}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <article
          key={content.title}
          className="px-4 py-2 w-full md:w-1/2 lg:w-1/3 md:px-2"
        >
          <div className="card w-full border-2 border-gray-100 p-6 rounded-lg">
            {content.image && (
              <Link passHref href="/blog">
                <a aria-label="blog image post" className="blog-entry-thumb">
                  <Image
                    className="rounded-t-lg"
                    src={content.image}
                    alt="Post"
                    height={60}
                    width={100}
                    layout="responsive"
                  />
                </a>
              </Link>
            )}
            <div className="card-body">
              <h2 className="text-lg font-bold">
                <Link passHref href="/blog">
                  <a aria-label={content.title}>{content.title}</a>
                </Link>
              </h2>
              <p className="text-md">{content.text}</p>
              <div className="flex my-2">
                {content.tags.map((tag) => (
                  <a
                    aria-label={tag}
                    key={tag}
                    className="border-2 border-gray-100 p-2 text-sm hover:text-white hover:bg-red-500 rounded-md mx-2"
                    href="#tag"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-gray-100 mt-6 pt-2 flex items-center justify-between">
              <a
                aria-label={`${content.author} image`}
                className="flex items-center "
                href="#author"
              >
                <div className="blog-entry-author-ava w-full mr-2">
                  <Image
                    src={content.authorImage}
                    className="rounded-full ml-4"
                    alt={content.author}
                    height={50}
                    width={50}
                    layout="responsive"
                  />
                </div>
                {content.author}
              </a>
              <div className="flex items-center justify-between w-28">
                <a aria-label="date" className="text-sm" href="#date">
                  {content.date}
                </a>
                <span className="mx-1 border-r-2 border-gray-200 h-6"></span>
                <Link passHref href="#comments">
                  <a aria-label="comment" className="text-sm flex items-center">
                    <Icons
                      className="mx-2 text-red-500"
                      size={20}
                      icon="mail"
                    />
                    {content.comment}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  )
}
