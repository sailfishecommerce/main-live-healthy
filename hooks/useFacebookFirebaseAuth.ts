/* eslint-disable no-console */
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
} from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useAtom } from 'jotai'

import type { socailAuthDetailsType } from '@/lib/atomConfig'
import { logsAtom, socailAuthDetailsAtom } from '@/lib/atomConfig'

export default function useFacebookFirebaseAuth() {
  const auth = getAuth()
  const [socailAuthDetails, setSocialAuthDetails]: any = useAtom<
    SetStateAction<socailAuthDetailsType | null>
  >(socailAuthDetailsAtom)
  const [, setLogData] = useAtom(logsAtom)

  const facebookProvider = new FacebookAuthProvider()
  const FacebookSignin = () => {
    setSocialAuthDetails({
      ...socailAuthDetails,
      socialLoginMethod: 'facebook',
    })
    signInWithRedirect(auth, facebookProvider)
  }

  const facebookRedirect = () => {
    console.log('facebookRedirect running ...')
    getRedirectResult(auth)
      .then((result: any) => {
        console.log('facebook-response', result)
        setLogData(result)
        const credential: any =
          FacebookAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        setSocialAuthDetails({
          ...socailAuthDetails,
          user: result.user,
          token,
          credential,
          errorMessage: null,
          socialLoginMethod: 'facebook',
          loggedIn: true,
        })
      })
      .catch((error: any) => {
        console.log('error', error)
        const credential: any = FacebookAuthProvider.credentialFromError(error)

        setSocialAuthDetails({
          ...socailAuthDetails,
          user: error?.user,
          email: error?.customData?.email,
          token: credential?.accessToken,
          errorMessage: error?.message,
          loggedIn: false,
          credential,
          socialLoginMethod: null,
        })
      })
  }
  return {
    FacebookSignin,
    facebookRedirect,
  }
}
