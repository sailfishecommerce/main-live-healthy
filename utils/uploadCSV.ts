/* eslint-disable no-console */
import axios from 'axios'

import type { progressStateType } from '@/types'

export function uploadAirtableCSV(
  results: { data: any[] },
  setProgress: any,
  progress: progressStateType
) {
  setProgress({ ...progress, loading: true })
  const uploadProduct = results.data.map((dataItem: any) =>
    axios
      .post('/api/upload-csv-to-swell', {
        dataItem,
        uploaded: 0,
        numberOfProducts: results.data.length,
      })
      .then((response) => {
        setProgress({
          ...progress,
          uploaded: response.data.uploaded,
          total: response.data.total,
          error: null,
          loading: true,
        })
      })
      .catch((error) => {
        console.log('error-uploadAirtableCSV', error)
        setProgress({
          ...progress,
          error,
          loading: false,
        })
      })
  )
  Promise.all(uploadProduct).then((response) => {
    console.log('response', response)
    setProgress({
      ...progress,
      loading: false,
    })
  })
}
