/* eslint-disable no-console */
import { convertFromRaw, convertToRaw } from 'draft-js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'

import CustomercareView from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'
import firebaseConfig from '@/lib/firebaseConfig'

export default function ReturnrefundsPage() {
  const [content, setContent] = useState(null)
  const pageContent = JsonContent.content[4]
  const { loading, databaseData } = useArticleData()
  initializeApp(firebaseConfig)

  console.log('content', content)

  useEffect(() => {
    const db = getDatabase()
    const dbRef = ref(db, 'articles/return-and-refunds/content')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      console.log('read-data', data)
      const contentState = convertFromRaw(JSON.parse(data))
      const contentStateRaw = convertToRaw(contentState)
      console.log('contentStateRaw', contentStateRaw)
      setContent(contentStateRaw)
    })
  }, [])
  console.log('databaseData', databaseData)
  console.log('loading', loading)

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
