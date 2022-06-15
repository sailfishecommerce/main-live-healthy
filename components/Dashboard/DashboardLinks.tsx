import Link from 'next/link'
import { useRouter } from 'next/router'

import dashboardLinks from '@/json/dashboard-links.json'

export default function DashboardLinks() {
  const router = useRouter()

  return (
    <ul className="border-t mt-4">
      {dashboardLinks.map((linkItem) => {
        const activeLink =
          router?.asPath === linkItem.link
            ? 'active hover:text-green-500 font-bold border-r-4 border-green-500 text-black bg-gray-100'
            : 'text-gray'
        return (
          <li
            className={`p-2 my-2 text-lg flex hover:bg-gray-100 ${activeLink}`}
            key={linkItem.link}
          >
            <Link passHref href={linkItem.link}>
              <a className="w-full">{linkItem.text}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
