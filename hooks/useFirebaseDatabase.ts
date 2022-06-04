import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useFirebaseDatabase() {
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)

  return
}
