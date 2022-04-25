import Link from 'next/link'

type footerLinkType = {
  slug: string
  name: string
}

interface Props {
  item: footerLinkType
}

function FooterLinkItem({ item }: Props) {
  return (
    <li className="my-2">
      <Link passHref href={item.slug}>
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
}

export default function FooterLinkGroup({
  title,
  tag,
  linkGroup,
  onViewLinks,
}: FooterLinkGroupProps) {
  return (
    <ul className="mt-4">
      <span className="flex items-center md:mb-6 mb-2">
        <h4 className="font-bold text-lg md:text-xl">{title}</h4>
        {tag && (
          <button
            type="button"
            title={tag}
            className="py-1 px-2 border mx-2 md:text-sm text-xs border-gray-500 text-gray-500 rounded-full hover:border-green-500 hover:text-green-500 hover:font-bold"
            onClick={onViewLinks}
          >
            {tag}
          </button>
        )}
      </span>
      {linkGroup.map((item: footerLinkType, index: number) => (
        <FooterLinkItem item={item} key={index} />
      ))}
    </ul>
  )
}
