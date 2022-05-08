import Link from 'next/link'

import Image from '@/components/Image'
import RatingStar from '@/components/Rating/RatingStar'
import useMediaQuery from '@/hooks/useMediaQuery'
import styles from '@/styles/ui.module.css'

interface CategoryProps {
  category: {
    name: string
    slug: string
    images: Array<{
      file: {
        url: string
      }
      name: string
    }>
  }
}
export default function Category({ category }: CategoryProps): JSX.Element {
  const mobileView = useMediaQuery('(max-width:768px)')
  const imageSize = mobileView
    ? {
        height: 250,
        width: 350,
      }
    : {
        height: 320,
        width: 450,
      }
  return (
    <div className="category">
      {category?.images && (
        <Link passHref href={`/collection/${category.slug}`}>
          <a
            aria-label={category.name}
            className={`${styles.categoryLink} m-auto flex justify-center`}
          >
            <Image
              height={imageSize.height}
              width={imageSize.width}
              className="rounded-lg m-auto flex justify-center"
              src={category.images[0]}
              alt={category.name}
              blurDataURL={category.images[0]}
              loading="lazy"
              layout="responsive"
            />
          </a>
        </Link>
      )}
      <div className="card-body py-2">
        <Link passHref href={`/collection/${category.slug}`}>
          <a aria-label={category.name} className="hover:text-red-500 text-md">
            {category.name}
          </a>
        </Link>
        <RatingStar rate={5} />
      </div>
    </div>
  )
}
