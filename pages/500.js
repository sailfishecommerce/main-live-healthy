import { useRouter } from 'next/router'
import { useEffect } from 'react'

import ReloadPage from '@/components/ReloadPage'

export default function Custom500() {
  const router = useRouter()

  useEffect(() => {
    router.back()
  }, [])

  return (
    <>
      <ReloadPage />
    </>
  )
}
