/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'

import useFacebookFirebaseAuth from '@/hooks/useFacebookFirebaseAuth'
import useGoogleFirebaseAuth from '@/hooks/useGoogleFirebaseAuth'
import type { socailAuthDetailsType } from '@/lib/atomConfig'
import { socailAuthDetailsAtom } from '@/lib/atomConfig'
import firebaseConfig from '@/lib/firebaseConfig'

export default function useFirebaseAuth() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const [, setSocialAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)

  const { facebookRedirect, FacebookSignin } = useFacebookFirebaseAuth()
  const { googleRedirect, GoogleSignin } = useGoogleFirebaseAuth()

  const Signout = () =>
    signOut(auth)
      .then(() => {
        toast.success('logout successful')
        setSocialAuthDetails(null)
      })
      .catch((error) => {
        setSocialAuthDetails(null)
        console.log('error', error)
        toast.error('logout error occured')
      })

  return {
    facebookRedirect,
    FacebookSignin,
    googleRedirect,
    GoogleSignin,
    Signout,
  }
}