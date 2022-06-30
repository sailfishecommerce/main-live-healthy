/* eslint-disable no-console */
import axios from 'axios'

import type { progressStateType } from '@/typings/types'

export default function uploadCSV(
  results: { data: any[] },
  setProgress: any,
  progress: progressStateType,
  setIsUploadSuccessful: any
) {
  setProgress({ ...progress, loading: true })
  const promises = results.data.map((dataItem: any) => {
    return axios
      .post('/api/upload-csv-to-swell', {
        dataItem,
        numberOfProducts: results.data.length,
      })
      .then((response) => {
        setProgress((prevState: progressStateType) => ({
          ...prevState,
          uploaded: response?.data?.uploaded
            ? prevState.uploaded + 1
            : prevState.uploaded,
          total: response.data.total,
          error: null,
          loading: true,
        }))
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
  Promise.all(promises)
    .then(() => {
      setProgress((prevState: progressStateType) => ({
        ...prevState,
        loading: false,
      }))
      setIsUploadSuccessful(true)
    })
    .catch(() => setIsUploadSuccessful(false))
}
