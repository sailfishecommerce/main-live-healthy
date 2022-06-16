import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

import CustomerCareSidebar from '@/components/Sidebar/CustomerCareSidebar'
import Applayout from '@/layouts/app-layout'

export default function CustomercareLayout({
  children,
}: PropsWithChildren<any>): JSX.Element {
  return (
    <Applayout title="Our Cookie Policy">
      <div className="content">
        <div className="relative banner w-full bg-mountain-green p-3 lg:p-0 lg:h-52 flex flex-col items-center justify-center">
          <h1 className="text-center lg:mb-5 font-bold text-lg lg:text-xl text-white">
            Welcome to Our Customer Care{' '}
          </h1>
          <h4 className="text-center text-sm lg:text-2xl">NEED HELP?</h4>
          <Link passHref href="/customer-care">
            <button
              type="button"
              aria-label="button"
              className="go-back lg:hidden absolute border p-2 left-2 top-4"
            >
              <MdArrowBackIosNew className="text-white" />
            </button>
          </Link>
        </div>
        <main className="flex items-start mx-auto">
          <CustomerCareSidebar />
          <div className="w-full lg:w-3/4 p-4 lg:p-8 bg-gray-100 h-full policy">
            {children}
          </div>
        </main>
      </div>
      <style jsx>
        {`
          .content {
            font-family: 'Commissioner', sans-serif;
            font-display: swap;
          }
          .policy {
            height: fit-content;
          }
        `}
      </style>
    </Applayout>
  )
}
