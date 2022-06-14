import axios from 'axios'

function axiosProgress(setProgress: any) {
  return {
    onUploadProgress: (progressEvent: any) => {
      const { loaded, total } = progressEvent
      const progressVal = Math.floor((loaded * 100) / total)
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
