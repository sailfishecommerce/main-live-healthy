/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'

import type { socailAuthDetailsType } from '@/lib/atomConfig'
import { socailAuthDetailsAtom } from '@/lib/atomConfig'
import firebaseConfig from '@/lib/firebaseConfig'

export default function useFacebookFirebaseAuth() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const [socailAuthDetails, setSocialAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)

  const Signout = () =>
    signOut(auth)
      .then(() => {
        setSocialAuthDetails(null)
        toast.success('logout successful')
      })
      .catch((error) => {
        // An error happened.
        console.log('error', error)
        toast.error('logout error occured')
      })

  const facebookProvider = new FacebookAuthProvider()
  const FacebookSignin = () => signInWithRedirect(auth, facebookProvider)

  const facebookRedirect = () =>
    getRedirectResult(auth)
      .then((result: any) => {
        console.log('facebook-response', result)
        const credential: any =
          FacebookAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        setSocialAuthDetails({
          ...socailAuthDetails,
          user: result.user,
          token,
          credential,
        })
      })
      .catch((error: any) => {
        console.log('error', error)
        const credential: any = FacebookAuthProvider.credentialFromError(error)

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
    FacebookSignin,
    Signout,
    facebookRedirect,
  }
}
