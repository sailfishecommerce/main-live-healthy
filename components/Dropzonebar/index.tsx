import type { progressStateType } from '@/types'
import byteSize from '@/utils/byteSize'

interface DropzonebarType {
  progress?: progressStateType
  dropzone: {
    getRootProps: any
    acceptedFiles: File[]
    getInputProps: any
    isDragActive: boolean
  }
  fileType: 'csv' | 'image'
  style: unknown
}

export default function Dropzonebar({
  progress,
  style,
  dropzone,
  fileType,
}: DropzonebarType) {
  const { getRootProps, acceptedFiles, getInputProps, isDragActive } = dropzone
  let percentage: any
  if (progress?.uploaded && progress?.total > 0) {
    percentage = Math.floor((progress.uploaded / progress.total) * 100)
  }
  const fileTypeText =
    fileType === 'csv'
      ? 'csv file, or click to select csv file'
      : 'image here or click to select the image'
  return (
    <>
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
              <p>Drag &apos;n&apos; drop the {fileTypeText}</p>
            )}
            {acceptedFiles.length > 0 && (
              <ul>
                {acceptedFiles.map((file: any) => (
                  <li key={file.path} className="uploaded-item text-blue-500">
                    <span className="font-bold">{file.name}</span>
                    <span className="text-red-500 ml-2">
                      ({byteSize(file.size)})
                    </span>
                  </li>
                ))}
              </ul>
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
            height: 100px;
            width: 100%;
            background-color: ${isDragActive
              ? 'var(--color-3)'
              : 'var(--color-4)'};
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
    </>
  )
}
