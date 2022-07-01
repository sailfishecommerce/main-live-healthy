/* eslint-disable no-console */
import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

export default function ReloadLayout({
  error,
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter()

  console.log('error', error)

  useEffect(() => {
    if (error) {
      router.reload()
    }
  }, [error, router])
  return <>{children}</>
}
