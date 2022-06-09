import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import byteSize from '@/utils/byteSize'

export default function UploadToSwellFromAirtable() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('acceptedFiles', acceptedFiles)
  }, [])
  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
    })
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      <span className="font-bold">{file.name}</span>
      <span className="text-red-500 ml-2">({byteSize(file.size)})</span>
    </li>
  ))

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
          <div {...getRootProps()}>
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
            background-color: var(--tan-light-hide);
            padding: 10px;
            margin-top: 10px;
          }
          .upload-area input {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}
