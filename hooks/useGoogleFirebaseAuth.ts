/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useAtom } from 'jotai'

import type { socailAuthDetailsType } from '@/lib/atomConfig'
import { socailAuthDetailsAtom } from '@/lib/atomConfig'
import firebaseConfig from '@/lib/firebaseConfig'

export default function useGoogleFirebaseAuth() {
  const app = initializeApp(firebaseConfig)
  const [socailAuthDetails, setSocialAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()

  const GoogleSignin = () => signInWithRedirect(auth, googleProvider)

  const googleRedirect = () =>
    getRedirectResult(auth)
      .then((result: any) => {
        console.log('google-response', result)
        const credential: any = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        setSocialAuthDetails({
          ...socailAuthDetails,
          user: result.user,
          token,
          credential,
        })
      })
      .catch((error) => {
        const credential: any = GoogleAuthProvider.credentialFromError(error)
        setSocialAuthDetails({
          ...socailAuthDetails,
          user: error.user,
          email: error?.customData?.email,
          token: credential.accessToken,
          errorMessage: error?.message,
          credential,
        })
      })

  return {
    GoogleSignin,
    googleRedirect,
  }
}
