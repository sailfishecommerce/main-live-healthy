import Head from 'next/head'
import type { PropsWithChildren } from 'react'

import DashboardProfile from '@/components/Dashboard/DashboardProfile'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'

interface Props {
  title: string
}

export default function DashboardLayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className="admin w-full grid grid-cols-6 bg-white">
        <Head>
          <title>Live healthy stores | {title}</title>
        </Head>
        <DashboardSidebar />
        {children}
        <DashboardProfile />
      </div>
      <style jsx>{`
        .admin {
          height: 100vh;
        }
      `}</style>
    </>
  )
}
