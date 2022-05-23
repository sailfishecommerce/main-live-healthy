import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useFirebaseEmailPassword() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const adminSignup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)

  const adminSignin = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)

  const adminLogout = () => signOut(auth)

  return {
    adminSignup,
    adminSignin,
    adminLogout,
  }
}
