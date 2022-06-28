import Image from 'next/image'

import displayTextView from '@/components/View/displayTextView'

export default function BlogContent({ post }: any) {
  const blogPostImages: any[] = Object.entries(post.entityMap)
  const mainImage = blogPostImages[0][1].data.src

  return (
    <section className="content">
      <div className="row flex flex-col">
        <Image
          src={mainImage}
          height={250}
          width={500}
          alt="post"
          className="rounded-xl mb-8"
          layout="responsive"
        />
        <hr className="mt-5" />
        {post.blocks.map((block: any) => {
          return displayTextView(block)
        })}
      </div>
    </section>
  )
}
