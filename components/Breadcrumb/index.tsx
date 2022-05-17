import Link from 'next/link'
import { AiOutlineMinus } from 'react-icons/ai'

interface Props {
  breadcrumbItems: Array<{
    name: string
    link: string | null
    active?: boolean
  }>
}

function BreadCrumbItem({ item }: any) {
  const linkStyle = item.active
    ? 'text-gray-900 md:text-sm text-xs'
    : 'text-gray-500 hover:text-green-300 md:text-sm text-xs '
  return (
    <>
      {item.link ? (
        <Link passHref href={item.link}>
          <a title={item.name} className={linkStyle}>
            {item.name}
          </a>
        </Link>
      ) : (
        <a title={item.name} className={linkStyle}>
          {item.name}
        </a>
      )}
    </>
  )
}

export default function Breadcrumb({ breadcrumbItems }: Props) {
  return (
    <ul className="flex items-center my-4">
      {breadcrumbItems.map((item, index) => {
        const crumbIndex = index + 1
        return crumbIndex % 2 === 0 ? (
          <li className="flex items-center" key={item.name}>
            <AiOutlineMinus className="mx-2 font-bold gray-manatee" />
            <BreadCrumbItem item={item} />
            {crumbIndex < breadcrumbItems.length && (
              <AiOutlineMinus className="mx-2 font-bold gray-manatee" />
            )}
          </li>
        ) : (
          <li key={item.link}>
            <BreadCrumbItem item={item} />
          </li>
        )
      })}
    </ul>
  )
}
