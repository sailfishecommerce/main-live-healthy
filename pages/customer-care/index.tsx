import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdArrowForward } from 'react-icons/md'

import policyContent from '@/json/customer-care.json'
import Applayout from '@/layouts/app-layout'

export default function CustomercarePage() {
  const router = useRouter()

  return (
    <Applayout title="Customer care">
      <div className="content">
        <div className="banner w-full bg-mountain-green py-3 lg:p-0 lg:h-52 flex flex-col items-center justify-center">
          <h1 className="text-center lg:mb-5 font-bold text-lg lg:text-xl text-white">
            Welcome to Our Customer Care{' '}
          </h1>
          <h4 className="text-center text-sm lg:text-2xl">NEED HELP?</h4>
        </div>
        <main className="flex items-start mx-auto">
          <div className="relative w-full lg:pt-20 bg-white py-2 flex items-start lg:justify-end lg:pr-12">
            <div className="links w-full">
              {policyContent.sidebar.map((policy) => (
                <div key={policy.title} className="policy lg:mb-4">
                  <h1 className="font-bold p-2 px-4 text-md lg:text-lg bg-white">
                    {policy.title}
                  </h1>
                  <div className="links flex flex-col">
                    {policy.links.map((link) => {
                      const activeLink = router.route.includes(link.link)
                        ? 'active mountain-green'
                        : 'text-gray-600 font-semibold'

                      return (
                        <Link passHref key={link.link} href={link.link}>
                          <a
                            className={`${activeLink} text-red-500 justify-between align-items flex text-md bg-gray-300 w-full p-2  px-4 my-0.5`}
                          >
                            {link.name}
                            <button
                              type="button"
                              aria-label="button"
                              className="go-back border-2 p-1 left-2 top-4"
                            >
                              <MdArrowForward className="text-white" />
                            </button>
                          </a>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <style jsx>
        {`
          .content {
            font-family: 'Commissioner', sans-serif;
            font-display: swap;
          }
        `}
      </style>
    </Applayout>
  )
}
