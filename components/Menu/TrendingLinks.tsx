import Image from 'next/image'
import Link from 'next/link'

interface TrendLinkProps {
  trendingItem: {
    slug: string
    name: string
    images: string[]
  }
}

export function TrendLink({ trendingItem }: TrendLinkProps) {
  return (
    <span title={trendingItem.name} className="trending-item lg:mr-4 mr-2">
      <Link passHref href={`/collection/${trendingItem.slug}`}>
        <a className="trending flex flex-col items-start md:items-center mr-4">
          <div className="image-wrapper lg:w-full w-11/12">
            <Image
              src={trendingItem.images[0]}
              height={120}
              width={180}
              className="hover:scale-105 rounded-xl"
              alt={trendingItem.name}
              layout="responsive"
            />
          </div>
          <p className="text-center hover:text-green-500 font-light mt-2 font-medium">
            {trendingItem.name}
          </p>
        </a>
      </Link>
    </span>
  )
}
