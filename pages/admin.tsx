/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'

export default function Admin() {
  const router = useRouter()

  useEffect(() => {
    router.push('https://stores-dashboard.vercel.app/admin/login')
  }, [])

  return (
    <>
      <div className="ripple">
        <SpinnerRipple centerRipple />
      </div>
      <style jsx>
        {`
          .ripple {
            display: flex;
            align-items: center;
            margin: auto;
            justify-content: center;
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}
