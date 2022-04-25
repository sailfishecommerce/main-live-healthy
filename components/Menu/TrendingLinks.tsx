import Image from 'next/image'
import Link from 'next/link'

interface TrendLinkProps {
  trendingItem: {
    slug: string
    name: string
    images: Array<{ file: { url: string } }>
  }
}

export function TrendLink({ trendingItem }: TrendLinkProps) {
  return (
    <span title={trendingItem.name} className="trending-item mr-4">
      <Link passHref href={`/collection/${trendingItem.slug}`}>
        <a className="trending flex flex-col items-start md:items-center">
          <Image
            src={trendingItem.images[0].file.url}
            height={120}
            width={180}
            className="hover:scale-105"
            alt={trendingItem.name}
          />
          <p className="text-center hover:text-green-500 font-light mt-2 font-medium">
            {trendingItem.name}
          </p>
        </a>
      </Link>
    </span>
  )
}
