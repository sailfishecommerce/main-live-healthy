import Image from 'next/image'

interface Props {
  author: {
    url: string
    authorName: string
    aboutAuthor: string
  }
}

export default function BlogAuthor({ author }: Props) {
  return (
    <div className="bg-gray-200 rounded-xl p-4 flex items-center mb-6">
      <Image
        src={author.url}
        alt={author.authorName}
        height={80}
        width={80}
        className="mr-6"
      />
      <div className="content ml-3">
        <h6 className="text-gray-500 text-xs">About the author</h6>
        <h5 className="font-bold mb-1 text-sm">{author.authorName}</h5>
        <p>{author.aboutAuthor}</p>
      </div>
    </div>
  )
}
