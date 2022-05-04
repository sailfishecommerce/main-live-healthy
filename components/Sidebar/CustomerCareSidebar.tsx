import Link from 'next/link'
import { useRouter } from 'next/router'

import policyContent from '@/json/customer-care.json'

export default function CustomerCareSidebar() {
  const router = useRouter()

  return (
    <aside className="relative hidden lg:flex lg:w-1/4 pt-20 bg-white py-2 flex items-start justify-end pr-12">
      <div className="links top-0">
        {policyContent.sidebar.map((policy) => (
          <div key={policy.title} className="policy mb-4">
            <h1 className="font-light text-lg">{policy.title}</h1>
            <div className="links flex flex-col">
              {policy.links.map((link) => {
                const activeLink = router.route.includes(link.link)
                  ? 'active mountain-green'
                  : 'text-gray-400'

                return (
                  <Link passHref key={link.link} href={link.link}>
                    <a className={`${activeLink} text-md my-2`}>{link.name}</a>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
