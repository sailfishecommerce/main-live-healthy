/* eslint-disable react-hooks/exhaustive-deps */
import { convertFromRaw, convertToRaw } from 'draft-js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useArticleData(databaseNode: string) {
  const [databaseData, setDatabaseData] = useState<{ blocks: any[] } | null>(
    null
  )

  function readDatabase() {
    initializeApp(firebaseConfig)
    const db = getDatabase()
    const databaseRefId = `articles/${databaseNode}/content`
    const dbRef = ref(db, databaseRefId)
    onValue(dbRef, (snapshot) => {
      const dbArticle = snapshot.val()
      const contentState = convertFromRaw(JSON.parse(dbArticle))
      const contentStateRaw = convertToRaw(contentState)
      setDatabaseData(contentStateRaw)
    })
  }

  useEffect(() => {
    readDatabase()
  }, [databaseNode])

  return { databaseData }
}
