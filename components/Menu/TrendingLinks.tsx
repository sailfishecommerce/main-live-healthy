/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'

import { useMediaQuery } from '@/hooks'
import useNav from '@/hooks/useNav'
import { categoryDropdownAtom } from '@/lib/atomConfig'

interface TrendLinkProps {
  trendingItem: {
    slug: string
    name: string
    images?: Array<{ file: { url: string } }> | string[] | any
  }
}

export function TrendLink({ trendingItem }: TrendLinkProps) {
  const [, setCategoryDropdown] = useAtom(categoryDropdownAtom)
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { toggleMobileMenu } = useNav()

  function toggleCategoryDropdownHandler() {
    if (mobileWidth) {
      toggleMobileMenu()
    } else if (!mobileWidth) {
      setCategoryDropdown((prev) => !prev)
    }
  }

  const productImage =
    typeof trendingItem?.images[0] === 'string'
      ? trendingItem?.images[0]
      : trendingItem?.images[0]?.file?.url

  return (
    <span title={trendingItem.name} className="trending-item lg:mr-4 mr-2">
      <Link passHref href={`/collection/${trendingItem.slug}`}>
        <a
          className="trending flex flex-col items-start md:items-center mr-4"
          onClick={toggleCategoryDropdownHandler}
        >
          <div className="trending-images block lg:w-full w-11/12">
            <Image
              src={productImage}
              height={120}
              width={180}
              className="hover:scale-105 rounded-xl block"
              alt={trendingItem.name}
              layout="responsive"
              blurDataURL={productImage}
              placeholder="blur"
            />
          </div>
          <p className="text-center flex mx-auto hover:text-green-500 font-light text-xs lg:mt-1 lg:text-base lg:font-medium">
            {trendingItem.name}
          </p>
        </a>
      </Link>
    </span>
  )
}
