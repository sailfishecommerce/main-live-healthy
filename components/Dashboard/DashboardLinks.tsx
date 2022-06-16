import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import dashboardLinks from '@/json/dashboard-links.json'

interface DashboardLinkProps {
  linkItem: {
    link: string
    icon: string
    text: string
  }
  activeLink: string
}

interface DashboardGroupProps {
  linkItemGroup: {
    text: string
    icon: string
    group?: Array<{ text: string; link: string; icon: string }>
  }
  activeLink: string
}

function DashboardLink({ linkItem, activeLink }: DashboardLinkProps) {
  const activeRouteLink =
    activeLink === linkItem?.link
      ? 'active hover:text-green-500 font-bold border-r-4 border-green-500 text-black bg-gray-100'
      : 'text-gray'
  return (
    <li
      className={`p-2 my-2 text-lg flex hover:bg-gray-100 ${activeRouteLink}`}
    >
      <Link passHref href={linkItem.link}>
        <a className="w-full">{linkItem.text}</a>
      </Link>
    </li>
  )
}

function DashboardGroup({ activeLink, linkItemGroup }: DashboardGroupProps) {
  const [showLink, setShowLink] = useState(false)
  const activeStyle = showLink
    ? 'bg-gray-100 active hover:text-green-500  border-r-4 border-green-500 font-bold '
    : ''
  return (
    <>
      <button
        type="button"
        className={`my-2 text-lg flex hover:bg-gray-100 w-full p-2 ${activeStyle}`}
        onClick={() => setShowLink(!showLink)}
      >
        {linkItemGroup.text}
      </button>
      {showLink &&
        linkItemGroup.group &&
        linkItemGroup.group.map((item) => (
          <DashboardLink
            key={item.link}
            linkItem={item}
            activeLink={activeLink}
          />
        ))}
    </>
  )
}

export default function DashboardLinks() {
  const router = useRouter()
  const routePath = router?.asPath
  return (
    <ul className="border-t mt-4">
      {dashboardLinks.map((linkItem) => {
        return linkItem.link ? (
          <DashboardLink
            key={linkItem.link}
            linkItem={linkItem}
            activeLink={routePath}
          />
        ) : (
          <DashboardGroup
            key={linkItem.link}
            linkItemGroup={linkItem}
            activeLink={routePath}
          />
        )
      })}
    </ul>
  )
}
