/* eslint-disable no-console */
import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { useState, useEffect } from 'react'

export default function ReloadLayout({
  error,
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const [loadOnce, setLoadOnce] = useState(false)
  const router = useRouter()

  console.log('error', error)

  useEffect(() => {
    if (!loadOnce) {
      setLoadOnce(true)
      router.reload()
    }
  }, [])
  return <>{children}</>
}
