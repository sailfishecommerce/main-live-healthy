import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

import { styles } from '@/components/Admin/styles'
import useAirtableDropzone from '@/hooks/useAirtableDropzone'
import byteSize from '@/utils/byteSize'

export default function UploadToAlgolia() {
  const { onDrop, progress } = useAirtableDropzone()

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
      ...styles.baseStyle,
      ...(isFocused ? styles.focusedStyle : {}),
      ...(isDragAccept ? styles.acceptStyle : {}),
      ...(isDragReject ? styles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      <span className="font-bold">{file.name}</span>
      <span className="text-red-500 ml-2">({byteSize(file.size)})</span>
    </li>
  ))

  return (
    <div>
      <h1 className="text-center text-2xl">
        Upload your CSV files to Algolia Livehealthy record
      </h1>
      <div className="upload mt-8">
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
        {progress > 0 && (
          <div className="w-full mt-6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
            {progress} % <p>Product upload complete</p>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .upload-area {
            height: 100px;
            width: 100%;
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
