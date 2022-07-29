/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { reloadPageAtom } from '@/lib/atomConfig'

export default function ReloadPage() {
  const router = useRouter()
  const [reloadPage, setReloadPage] = useAtom(reloadPageAtom)

  useEffect(() => {
    if (!reloadPage) {
      setReloadPage(true)
      router.reload()
    }
  }, [])

  return (
    <div className="w-full">
      <div className="container mx-auto h-96 justify-center flex items-center">
        <SpinnerRipple centerRipple />
      </div>
    </div>
  )
}
