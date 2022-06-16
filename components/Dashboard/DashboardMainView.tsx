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
        {router.pathname === '/admin/invoice/[id]' && (
          <Button
            className="bg-mountain-green text-white px-2 py-1 text-md rounded-md mt-4 flex items-center"
            type="button"
            text="Go back"
            icon={<BsArrowLeft />}
            onClick={() => router.back()}
          />
        )}
        {children}
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
