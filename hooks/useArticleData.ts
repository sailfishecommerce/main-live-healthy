/* eslint-disable import/dynamic-import-chunkname */
/* eslint-disable react-hooks/exhaustive-deps */
import { initializeApp } from 'firebase/app'
import { useEffect, useState } from 'react'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useArticleData(databaseNode: string) {
  const [databaseData, setDatabaseData] = useState<{ blocks: any[] } | null>(
    null
  )

  async function readDatabase() {
    initializeApp(firebaseConfig)
    const firebaseDatabase = await import('firebase/database')
    const db = firebaseDatabase.getDatabase()
    const dbRef = firebaseDatabase.ref(db, databaseNode)
    firebaseDatabase.onValue(dbRef, async (snapshot: any) => {
      const dbArticle = snapshot.val()
      const draftJs = await import('draft-js')
      const contentState = draftJs.convertFromRaw(JSON.parse(dbArticle))
      const contentStateRaw = draftJs.convertToRaw(contentState)
      setDatabaseData(contentStateRaw)
    })
  }

  useEffect(() => {
    readDatabase()
  }, [databaseNode])

  return { databaseData }
}
