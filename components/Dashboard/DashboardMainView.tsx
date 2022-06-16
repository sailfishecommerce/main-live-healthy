import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import Button from '@/components/Button'
import DashboardSearch from '@/components/Dashboard/DashboardSearch'

export default function DashboardMainView({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter()
  return (
    <>
      <div className="bg-gray-100 col-span-4 px-8 main">
        <DashboardSearch />
        <div className="dashboard-content relative mt-3">
          {router.pathname === '/admin/invoice/[id]' && (
            <Button
              className="absolute z-0 top-0 bg-red-500 hover:bg-red-400 text-white px-2 py-1 text-md rounded-md flex items-center"
              type="button"
              text="Go back"
              icon={<BsArrowLeft />}
              onClick={() => router.back()}
            />
          )}
          <div className="children-wrapper z-2 pt-6">{children}</div>
        </div>
      </div>
      <style jsx>
        {`
          .main {
            overflow-y: scroll;
          }
        `}
      </style>
    </>
  )
}
