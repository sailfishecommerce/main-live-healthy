import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'

import AdminIcons from '@/components/Icons/AdminIcons'
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
      ? 'font-bold border-r-4 border-green-500 mountain-green bg-gray-100'
      : 'text-gray'
  return (
    <li
      className={`p-2 my-2 text-lg flex hover:bg-gray-100 hover:text-red-500 ${activeRouteLink}`}
    >
      <Link passHref href={linkItem.link}>
        <a className="w-full flex items-center">
          <AdminIcons icon={linkItem.icon} />
          <span className="ml-4">{linkItem.text}</span>
        </a>
      </Link>
    </li>
  )
}

function DashboardGroup({ activeLink, linkItemGroup }: DashboardGroupProps) {
  const [showLink, setShowLink] = useState(false)
  const activeStyle = showLink
    ? 'bg-gray-100 border-r-4 border-green-500 font-bold '
    : ''
  const caretDisplay = showLink ? (
    <BsFillCaretUpFill />
  ) : (
    <BsFillCaretDownFill />
  )
  return (
    <>
      <button
        type="button"
        className={`my-2 text-lg flex hover:bg-gray-100 flex hover:text-red-500 items-center w-full p-2 ${activeStyle}`}
        onClick={() => setShowLink(!showLink)}
      >
        <AdminIcons icon={linkItemGroup.icon} />
        <span className="ml-4">{linkItemGroup.text}</span>
        <span className="ml-4">{caretDisplay}</span>
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
            key={linkItem.icon}
            linkItemGroup={linkItem}
            activeLink={routePath}
          />
        )
      })}
    </ul>
  )
}
