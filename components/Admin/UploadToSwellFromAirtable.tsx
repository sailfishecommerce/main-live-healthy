/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import byteSize from '@/utils/byteSize'

function csvToArray(str, delimiter = ',') {
  console.log('str', str)

  const headers = str?.slice(0, str.indexOf('\n')).split(delimiter)
  const rows = str?.slice(str.indexOf('\n') + 1).split('\n')
  console.log('headers', headers)
  console.log('rows', rows)

  const arr = rows.map(function (row: any) {
    const values = row.split(delimiter)
    const el = headers.reduce(function (
      objectItem: any,
      header: string,
      index: number
    ) {
      objectItem[header] = values[index]
      return objectItem
    },
    {})
    return el
  })
  return arr
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'white',
  borderStyle: 'dashed',
  color: '#9e9aa6',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}
const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

export default function UploadToSwellFromAirtable() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const csvFile = acceptedFiles[0]
    console.log('csvFile', csvFile)
    // const reader = new FileReader()
    // reader.onload = function (event: any) {
    //   const text = event.target.value
    //   const data = csvToArray(text)
    //   window.alert(JSON.stringify(data))
    // }
    // reader.readAsText(csvFile)
  }, [])

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      '.csv': [
        '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
      ],
    },
  })

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      <span className="font-bold">{file.name}</span>
      <span className="text-red-500 ml-2">({byteSize(file.size)})</span>
    </li>
  ))

  console.log(
    'isFocused, isDragAccept, isDragReject ',
    isFocused,
    isDragAccept,
    isDragReject
  )
  return (
    <div>
      <h1 className="text-center text-2xl">
        Upload your CSV files from Airtable to Swell
      </h1>
      <p className="text-lg mt-4">
        For effective upload, Upload a maximum of 100 products at a time
      </p>
      <div className="upload">
        <div className="upload-area">
          <div {...getRootProps({ style })}>
            <input
              className="border border-2 h-20 bg-red-500"
              {...getInputProps()}
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop the csv file here, or click to select
                files
              </p>
            )}
            {acceptedFiles.length > 0 && <ul>{files}</ul>}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .upload-area {
            height: 100px;
            width: 60%;
            background-color: ${isDragActive
              ? 'var(--tan-hide)'
              : 'var(--tan-light-hide)'};
            padding: 10px;
            margin-top: 10px;
          }
          .upload-area div {
            height: 100%;
            width: 100%;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin: auto;
            justify-content: center;
            font-size: 16px;
            font-style: italic;
            font-weight: 600;
          }
          @media (max-width: 1000px) {
            .upload-area {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  )
}
