/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import type { SetStateAction } from 'jotai'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import useFirebaseAuth from '@/hooks/useFirebaseAuth'
import type { socailAuthDetailsType } from '@/lib/atomConfig'
import { socailAuthDetailsAtom } from '@/lib/atomConfig'

export default function useGreetuser() {
  const { getUserAccount } = useAccount()
  const [socailAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)
  const { loggedIn, socialLoginMethod } = socailAuthDetails
  const { data: userDetails } = useQuery('userDetails', getUserAccount, {
    staleTime: Infinity,
  })

  const { googleRedirect, facebookRedirect } = useFirebaseAuth()

  useEffect(() => {
    if (!loggedIn && socialLoginMethod === 'google') {
      googleRedirect()
    } else if (!loggedIn && socialLoginMethod === 'facebook') {
      facebookRedirect()
    }
  }, [loggedIn, socialLoginMethod])

  //   console.log('socailAuthDetails', socailAuthDetails)

  let name
  if (loggedIn && socialLoginMethod === 'google') {
    name = socailAuthDetails.user.displayName
  } else {
    name = userDetails?.name
  }

  return {
    name,
  }
}
