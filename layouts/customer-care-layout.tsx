import type { PropsWithChildren } from 'react'

import CustomerCareSidebar from '@/components/Sidebar/CustomerCareSidebar'
import Applayout from '@/layouts/app-layout'

export default function CustomercareLayout({
  children,
}: PropsWithChildren<any>): JSX.Element {
  return (
    <Applayout title="Our Cookie Policy">
      <div className="content">
        <div className="banner w-full bg-mountain-green h-52 flex flex-col items-center justify-center">
          <h1 className="text-center mb-5 font-bold text-xl text-white">
            Welcome to Our Customer Care{' '}
          </h1>
          <h4 className="text-center text-2xl">NEED HELP?</h4>
        </div>
        <main className="flex items-start mx-auto">
          <CustomerCareSidebar />
          <div className="w-3/4 p-8 bg-gray-100">{children}</div>
        </main>
      </div>
      <style jsx>
        {`
          .content {
            font-family: 'Commissioner', sans-serif;
          }
        `}
      </style>
    </Applayout>
  )
}
