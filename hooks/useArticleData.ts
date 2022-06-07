/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import firebaseConfig from '@/lib/firebaseConfig'

export default function useArticleData() {
  const router = useRouter()
  const [databaseData, setDatabaseData] = useState(null)
  const [loading, setLoading] = useState(false)

  const dbRoute = router.route.split('/')[2]

  useEffect(() => {
    setLoading(true)
    initializeApp(firebaseConfig)
    const db = getDatabase()
    const databaseRefId = `articles/${dbRoute}/content`
    console.log('databaseRefId', databaseRefId)
    const dbRef = ref(db, databaseRefId)
    onValue(dbRef, (snapshot) => {
      const dbArticle = snapshot.val()
      console.log('dbArticle', dbArticle)
      setDatabaseData(JSON.parse(dbArticle))
      setLoading(false)
    })
  }, [])

  return { databaseData, loading }
}
