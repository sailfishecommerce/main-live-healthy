/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-console */
import axios from 'axios'

import type { progressStateType } from '@/types'

const count = 0
export default function uploadCSV(
  results: { data: any[] },
  setProgress: any,
  progress: progressStateType
) {
  setProgress({ ...progress, loading: true })
  results.data.map((dataItem: any, index) => {
    const lastIndex = results.data.length - 1
    const loadingStatus = lastIndex === index ? false : true
    return axios
      .post('/api/upload-csv-to-swell', {
        dataItem,
        numberOfProducts: results.data.length,
      })
      .then((response) => {
        const uploadedCount = response.data.uploaded ? count + 1 : count
        setProgress({
          ...progress,
          uploaded: uploadedCount,
          total: response.data.total,
          error: null,
          loading: loadingStatus,
        })
        return count
      })
      .catch((error) => {
        console.log('error-uploadAirtableCSV', error)
        setProgress({
          ...progress,
          error: error?.message,
          loading: false,
        })
      })
  })
}
