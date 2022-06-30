/* eslint-disable no-nested-ternary */
import Dropzonebarlist from '@/components/Dropzonebar/Dropzonebarlist'
import type { progressStateType } from '@/typings/types'

interface DropzonebarType {
  progress?: progressStateType
  dropzone: {
    getRootProps: any
    acceptedFiles: File[]
    getInputProps: any
    isDragActive: boolean
  }
  fileType: 'csv' | 'image' | 'images'
  style: unknown
  uploadStatus: boolean | null
  message?: string
}

export default function Dropzonebar({
  progress,
  style,
  dropzone,
  fileType,
  uploadStatus,
  message,
}: DropzonebarType) {
  const { getRootProps, acceptedFiles, getInputProps, isDragActive } = dropzone
  let percentage: any
  if (progress?.uploaded && progress?.total > 0) {
    percentage = Math.floor((progress.uploaded / progress.total) * 100)
  }
  const fileTypeText =
    fileType === 'csv'
      ? 'csv file, or click to select csv file'
      : fileType === 'images'
      ? 'image here, you can upload multiple images or click to select image(s)'
      : 'image here or click to select the image'
  return (
    <>
      <div className="upload mt-8">
        <div className="upload-area">
          <div {...getRootProps({ style })}>
            <input
              className="input-view border border-2 bg-red-500"
              {...getInputProps()}
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop the {message ? message : fileTypeText}
              </p>
            )}
            {uploadStatus === null ? (
              <Dropzonebarlist acceptedFiles={acceptedFiles} />
            ) : uploadStatus ? null : (
              <p className="text-red-500">Upload error</p>
            )}
          </div>
        </div>
        {progress && progress?.total > 0 && (
          <div className="w-full mt-6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${percentage}%` }}
            />
            {percentage} %
            <p>
              <span className="font-bold mr-2">
                {`${progress?.uploaded} / ${progress.total}`}
              </span>
              Product uploaded
            </p>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .upload-area {
            height: 100%;
            width: 100%;
            background-color: ${isDragActive
              ? 'var(--color-3)'
              : 'var(--color-4)'};
            padding: 10px;
            margin-top: 10px;
          }
          .input-view {
            height: 100%;
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
    </>
  )
}
