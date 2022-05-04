import Link from 'next/link'
import { useRouter } from 'next/router'

import dashboardLinks from '@/json/dashboard-links.json'

export default function DashboardLinks() {
  const router = useRouter()

  return (
    <ul>
      {dashboardLinks.map((linkItem) => {
        const activeLink =
          router.route === linkItem.link
            ? 'active hover:text-green-500 font-bold border-r-4 border-green-500 text-black'
            : 'text-gray'
        return (
          <li className={`my-4 text-lg ${activeLink}`} key={linkItem.link}>
            <Link passHref href={linkItem.link}>
              <a>{linkItem.text}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
