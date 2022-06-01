import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { useState, useEffect } from 'react'

export default function ReloadLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const [loadOnce, setLoadOnce] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && !loadOnce) {
      setLoadOnce(true)
      router.reload()
    }
  }, [])
  return <>{children}</>
}
