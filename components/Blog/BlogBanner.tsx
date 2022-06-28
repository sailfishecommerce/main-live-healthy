import Link from 'next/link'
import { HiHome } from 'react-icons/hi'

export default function BlogBanner() {
  return (
    <div className="bg-gray-100 py-4 w-full">
      <div className="container px-4 m-auto flex justify-between py-2 lg:py-3">
        <div className="lg:order-2 mb-3 lg:mb-0 lg:pt-2">
          <nav aria-label="breadcrumb">
            <ol className="flex lg:flex-nowrap justify-center lg:justify-content-start">
              <li className="hover:text-red-500">
                <Link passHref href="/index">
                  <a aria-label="home" className="flex items-center">
                    <HiHome className="mx-1" />
                    Home
                  </a>
                </Link>
              </li>
              <li className="mx-2">&gt;</li>
              <li className="text-gray-500">
                <a aria-label="blog" href="#blog" className="text-sm">
                  Blog
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="order-1 text-center lg:text-left">
          <h1 className="text-2xl font-semibold  mb-0">Blog</h1>
        </div>
      </div>
    </div>
  )
}
