import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useEffect } from 'react'

import CustomercareView from '@/components/View/CustomercareView'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'
import firebaseConfig from '@/lib/firebaseConfig'

export default function ShippingDeliveriesPage() {
  const pageContent = JsonContent.content[3]
  initializeApp(firebaseConfig)

  useEffect(() => {
    const db = getDatabase()
    const dbRef = ref(db, 'articles/shipping-info/content')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      console.log('read-data', data)
    })
  }, [])

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
