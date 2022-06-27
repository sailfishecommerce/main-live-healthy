/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import MediaImage from '@/components/MediaImage'
import useDatabaseData from '@/hooks/useDatabaseData'
import paginateData from '@/utils/paginateData'

export default function MediaView() {
  const [paginatedArray, setPaginatedArray] = useState<any>([])
  const [activePagination, setActivePagination] = useState<any>(1)
  const { dbdata: media, loading } = useDatabaseData('media/')

  const mediaArray = media === null ? [] : Object.entries(media)
  const arrayCount = Math.ceil(mediaArray.length / 4)

  const arrayGroup = new Array(arrayCount).fill(0)

  useEffect(() => {
    if (media !== null) {
      const paginatedData = paginateData(mediaArray, 4, 1)
      setActivePagination(1)
      setPaginatedArray(paginatedData)
    }
  }, [media])

  function paginateArray(pageNumber: number) {
    if (mediaArray.length > 0) {
      const paginatedData = paginateData(mediaArray, 4, pageNumber)
      setActivePagination(pageNumber)
      setPaginatedArray(paginatedData)
    }
  }
  return (
    <div className="w-4/6 ml-8 border-l-2 pl-8 h-screen">
      {loading ? (
        <SpinnerRipple centerRipple />
      ) : paginatedArray.length > 0 ? (
        <div className="media-library">
          <div className="media gap-5 border p-4 grid grid-cols-2">
            {paginatedArray.map(([imageKey, image]: any) => {
              const parsedMediaItem = JSON.parse(image)
              return (
                <MediaImage
                  key={imageKey}
                  imageKey={imageKey}
                  parsedMediaItem={parsedMediaItem}
                />
              )
            })}
          </div>
          <ul className="paginate flex items-center p-0 justify-center mt-6">
            {arrayGroup.map((_, index) => {
              const item = index + 1
              const activeStyle =
                activePagination === item ? 'bg-mountain-green text-white' : ''
              return (
                <li key={item} className="mx-4">
                  <button
                    type="button"
                    className={`${activeStyle} px-2 `}
                    onClick={() => paginateArray(item)}
                  >
                    {item}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <h6 className="text-center font-medium text-lg">
          No media uploaded yet
        </h6>
      )}
    </div>
  )
}
