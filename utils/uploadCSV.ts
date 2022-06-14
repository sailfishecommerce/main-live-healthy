/* eslint-disable no-console */
import axios from 'axios'

function axiosProgress(setProgress: any) {
  return {
    onUploadProgress: (progressEvent: any) => {
      console.log('progressEvent', progressEvent)
      const progressVal = Math.round(
        (progressEvent.loaded / progressEvent.total) * 50
      )
      setProgress(progressVal)
    },
    onDownloadProgress: (progressEvent: any) => {
      const progressVal = Math.round(
        50 + (progressEvent.loaded / progressEvent.total) * 50
      )
      console.log('progressVal', progressVal)
      setProgress(progressVal)
    },
  }
}

export function uploadAirtableCSV(results: { data: any[] }, setProgress: any) {
  return results.data.map((dataItem: any) =>
    axios.post('/api/upload-csv-to-swell', dataItem, axiosProgress(setProgress))
  )
}

export function uploadAlgoliaCSV(results: { data: any[] }, setProgress: any) {
  return axios.post(
    '/api/upload-csv-to-algolia',
    results.data,
    axiosProgress(setProgress)
  )
}
