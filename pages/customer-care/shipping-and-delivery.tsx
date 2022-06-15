/* eslint-disable no-console */
import { convertFromRaw, convertToRaw } from 'draft-js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'

import CustomercareView from '@/components/View/CustomercareView'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'
import firebaseConfig from '@/lib/firebaseConfig'

export default function ShippingDeliveriesPage() {
  const [content, setContent] = useState(null)
  const pageContent = JsonContent.content[3]
  initializeApp(firebaseConfig)

  console.log('content', content)

  useEffect(() => {
    const db = getDatabase()
    const dbRef = ref(db, 'articles/shipping-info/content')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      console.log('read-data', data)
      const contentState = convertFromRaw(JSON.parse(data))
      const contentStateRaw = convertToRaw(contentState)
      console.log('contentStateRaw', contentStateRaw)
      setContent(contentStateRaw)
    })
  }, [])

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
