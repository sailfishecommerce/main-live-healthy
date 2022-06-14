import axios from 'axios'

function axiosProgress(setProgress: any) {
  return {
    onUploadProgress: (progressEvent: any) => {
      const progressVal = Math.round(
        (progressEvent.loaded / progressEvent.total) * 50
      )
      setProgress(progressVal)
    },
    onDownloadProgress: (progressEvent: any) => {
      const progressVal = Math.round(
        50 + (progressEvent.loaded / progressEvent.total) * 50
      )
      setProgress(progressVal)
    },
  }
}

type urlType = '/api/upload-csv-to-algolia' | '/api/upload-csv-to-swell'

export default function uploadCSV(
  url: urlType,
  results: { data: any[] },
  setProgress: any
) {
  return results.data.map((dataItem: any) =>
    axios.post(url, dataItem, axiosProgress(setProgress))
  )
}
