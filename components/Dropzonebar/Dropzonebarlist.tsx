import byteSize from '@/utils/byteSize'

interface Props {
  acceptedFiles: Array<{
    name: string
    size: number
  }>
}

export default function Dropzonebarlist({ acceptedFiles }: Props) {
  const dropdownStyle = acceptedFiles.length > 1 ? 'text-white' : ''

  return (
    <div className={dropdownStyle}>
      {acceptedFiles.length > 0 && (
        <>
          <ul className="pl-0 items-start flex flex-col mt-2 text-sm">
            {acceptedFiles.map((file: any) => (
              <li key={file.path} className="uploaded-item text-blue-500">
                <span className="font-bold">{file.name}</span>
                <span className="text-red-500 ml-2">
                  ({byteSize(file.size)})
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
