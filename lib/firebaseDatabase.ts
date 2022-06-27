import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, remove, onValue } from 'firebase/database'

import colorCodes from '@/json/color-codes.json'
import firebaseConfig from '@/lib/firebaseConfig'

export default function firebaseDatabase() {
  initializeApp(firebaseConfig)

  function writeData(dbRefId: string, content: any) {
    const db = getDatabase()
    return set(ref(db, dbRefId), content)
  }

  function readData(dbRefId: string, dbData: any) {
    const db = getDatabase()
    const dbRef = ref(db, dbRefId)
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        dbData(JSON.parse(data))
      } else {
        dbData(colorCodes)
      }
    })
  }

  function readFromDB(dbRefId: string, dbData: any, setLoading: any) {
    setLoading(true)
    const db = getDatabase()
    const dbRef = ref(db, dbRefId)
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const formatData = typeof data === 'string' ? JSON.parse(data) : data
        dbData(formatData)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }

  function deleteItemFromDB(dbRefId: string) {
    const db = getDatabase()
    return remove(ref(db, dbRefId))
  }
  return { writeData, readData, readFromDB, deleteItemFromDB }
}
