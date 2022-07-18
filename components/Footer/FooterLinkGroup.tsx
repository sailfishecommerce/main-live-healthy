import Link from 'next/link'

type footerLinkType = {
  slug: string
  name: string
}

interface Props {
  item: footerLinkType
  linkPrefix?: string
}

function FooterLinkItem({ item, linkPrefix }: Props) {
  const linkSlug = linkPrefix ? `${linkPrefix}${item.slug}` : item.slug
  return (
    <li className="my-2">
      <Link passHref href={linkSlug}>
        <a className="hover:text-green-500" title={item.name}>
          {item.name}
        </a>
      </Link>
    </li>
  )
}

interface FooterLinkGroupProps {
  title: string
  tag?: string
  linkGroup: footerLinkType[] | []
  onViewLinks?: () => void
  linkPrefix?: string
}

export default function FooterLinkGroup({
  title,
  tag,
  linkGroup,
  onViewLinks,
  linkPrefix,
}: FooterLinkGroupProps) {
  return (
    <ul className="mt-4">
      <li className="flex lg:flex-row md:flex-col items-start lg:items-center md:mb-6 mb-2">
        <h4 className="font-bold text-lg lg:text-xl">{title}</h4>
        {tag && (
          <button
            aria-label="tag"
            type="button"
            title={tag}
            className="py-1 px-1 lg:px-2 border mx-2 lg:text-sm text-xs border-gray-500 text-gray-500 rounded-full hover:border-green-500 hover:text-green-500 hover:font-bold"
            onClick={onViewLinks}
          >
            {tag}
          </button>
        )}
      </li>
      {linkGroup.map((item: footerLinkType) => (
        <FooterLinkItem linkPrefix={linkPrefix} item={item} key={item.slug} />
      ))}
    </ul>
  )
}
