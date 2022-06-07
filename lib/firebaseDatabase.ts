/* eslint-disable no-param-reassign */
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'

import firebaseConfig from '@/lib/firebaseConfig'

export default function firebaseDatabase() {
  initializeApp(firebaseConfig)

  function writeData(dbRefId: string, content: any) {
    const db = getDatabase()
    set(ref(db, dbRefId), content)
  }

  function readData(dbRefId: string, dbData: any) {
    const db = getDatabase()
    const dbRef = ref(db, dbRefId)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      console.log('datadata-data', data)
      dbData = data
      return dbData
    })
  }
  return { writeData, readData }
}
