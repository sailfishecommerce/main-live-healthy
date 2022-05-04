import type { PropsWithChildren } from 'react'

import DashboardSearch from '@/components/Dashboard/DashboardSearch'

export default function DashboardMainView({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="bg-gray-100 col-span-4 px-8">
      <DashboardSearch />
      {children}
    </div>
  )
}
