import { convertFromRaw, convertToRaw } from 'draft-js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useDatabase() {
  const readDatabase = (databaseNode: string, setContent: any) => {
    initializeApp(firebaseConfig)
    const db = getDatabase()
    const dbRef = ref(db, databaseNode)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const contentState = convertFromRaw(JSON.parse(data))
      const contentStateRaw = convertToRaw(contentState)
      setContent(contentStateRaw)
    })
  }

  return {
    readDatabase,
  }
}
