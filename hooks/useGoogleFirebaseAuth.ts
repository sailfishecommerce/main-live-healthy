import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useAtom } from 'jotai'

import { socailAuthDetailsAtom } from '@/lib/atomConfig'
import type { socailAuthDetailsType } from '@/typings/atomtype'

export default function useGoogleFirebaseAuth() {
  const [socailAuthDetails, setSocialAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  const googleRedirect = () =>
    getRedirectResult(auth)
      .then((result: any) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken

        setSocialAuthDetails({
          ...socailAuthDetails,
          user: result?.user,
          token,
          credential,
          errorMessage: null,
          socialLoginMethod: 'google',
          loggedIn: true,
        })
      })
      .catch((error) => {
        const credential: any = GoogleAuthProvider.credentialFromError(error)
        setSocialAuthDetails({
          ...socailAuthDetails,
          user: error?.user,
          email: error?.customData?.email,
          token: credential?.accessToken,
          errorMessage: error?.message,
          credential,
          loggedIn: false,
        })
      })

  const GoogleSignin = () => {
    setSocialAuthDetails({
      ...socailAuthDetails,
      socialLoginMethod: 'google',
    })
    signInWithRedirect(auth, googleProvider)
  }

  return {
    GoogleSignin,
    googleRedirect,
  }
}
