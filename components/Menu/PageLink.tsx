/* eslint-disable no-nested-ternary */
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  menuItem: {
    slug: string
    name: string
  }
  className?: string
  link?: string
}

export default function PageLink({ menuItem, className, link }: Props) {
  const router: any = useRouter()
  const linkClassName = className
    ? className
    : 'font-semibold text-sm md:text-lg md:font-light'
  const activeLinkStyle = router.query.slugs
    ? router?.query?.slugs[0]?.includes(menuItem.slug) ||
      router.route.includes(menuItem.slug)
      ? 'mountain-green'
      : ''
    : router.pathname.includes(menuItem.slug)
    ? 'mountain-green'
    : ''
  const pageLink = link ? `/${link}/${menuItem.slug}` : menuItem.slug
  return (
    <li className="md:mx-1 mx-0 md:text-sm lg:text-md" key={menuItem.slug}>
      <Link passHref href={pageLink}>
        <a
          title={menuItem.name}
          className={`${activeLinkStyle} hover:text-green-500 ${linkClassName} `}
        >
          {menuItem.name}
        </a>
      </Link>
    </li>
  )
}
