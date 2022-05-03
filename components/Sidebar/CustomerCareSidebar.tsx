import Link from 'next/link'
import { useRouter } from 'next/router'

import policyContent from '@/json/customer-care.json'

export default function CustomerCareSidebar() {
  const router = useRouter()

  return (
    <div className="w-1/4 bg-white py-2">
      {policyContent.sidebar.map((policy) => (
        <div key={policy.title} className="policy mb-4">
          <h1 className="font-light">{policy.title}</h1>
          <div className="links flex flex-col">
            {policy.links.map((link) => {
              const activeLink = router.route.includes(link.link)
                ? 'active mountain-green'
                : 'text-gray-400'

              return (
                <Link
                  passHref
                  key={link.link}
                  href={`/customer-care/${link.link}`}
                >
                  <a className={`${activeLink} my-2`}>{link.name}</a>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
