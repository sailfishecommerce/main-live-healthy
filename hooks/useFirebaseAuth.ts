/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { toast } from 'react-toastify'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useFirebaseAuth() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()

  const GoogleSignin = () => signInWithRedirect(auth, googleProvider)
  let user
  let token
  let errorCode
  let errorMessage
  let email
  let credential: any

  const googleRedirect = () =>
    getRedirectResult(auth)
      .then((result: any) => {
        console.log('google-response', result)
        credential = GoogleAuthProvider.credentialFromResult(result)
        token = credential.accessToken

        // The signed-in user info.
        user = result.user
      })
      .catch((error) => {
        // Handle Errors here.
        errorCode = error.code
        errorMessage = error.message
        email = error.customData.email
        // The AuthCredential type that was used.
        credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  const Signout = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.
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
        credential = FacebookAuthProvider.credentialFromResult(result)
        token = credential.accessToken

        user = result.user
      })
      .catch((error) => {
        errorCode = error.code
        errorMessage = error.message
        email = error.customData.email
        credential = FacebookAuthProvider.credentialFromError(error)
      })

  return {
    GoogleSignin,
    FacebookSignin,
    user,
    token,
    errorCode,
    errorMessage,
    email,
    credential,
    googleRedirect,
    Signout,
    facebookRedirect,
  }
}
