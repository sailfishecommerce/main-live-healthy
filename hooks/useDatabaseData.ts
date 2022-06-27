import { useState, useEffect } from 'react'

import firebaseDatabase from '@/lib/firebaseDatabase'

export default function useDatabaseData(dbNode: string) {
  const [dbdata, setDBData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dbNode && dbdata === null) {
      const { readFromDB } = firebaseDatabase()
      readFromDB(dbNode, setDBData, setLoading)
    }
  }, [dbdata, dbNode])

  return { dbdata, loading, setDBData }
}
