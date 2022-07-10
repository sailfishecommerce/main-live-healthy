/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import type { SetStateAction } from 'jotai'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useAccount } from '@/hooks'
import useFirebaseAuth from '@/hooks/useFirebaseAuth'
import { socailAuthDetailsAtom } from '@/lib/atomConfig'
import type { socailAuthDetailsType } from '@/typings/atomtype'

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

  let name
  if (loggedIn && socialLoginMethod === 'google') {
    name = socailAuthDetails.user.displayName
  } else {
    name = userDetails?.name
  }

  return {
    name,
    userDetails,
    loggedIn,
  }
}
