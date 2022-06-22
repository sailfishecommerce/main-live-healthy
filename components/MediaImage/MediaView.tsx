/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import MediaImage from '@/components/MediaImage'
import firebaseDatabase from '@/lib/firebaseDatabase'
import paginateData from '@/utils/paginateData'

export default function MediaView() {
  const [media, setMedia] = useState<any>(null)
  const [paginatedArray, setPaginatedArray] = useState<any>([])
  const [activePagination, setActivePagination] = useState<any>(1)
  const [loading, setLoading] = useState(false)
  const { readFromDB } = firebaseDatabase()

  const mediaArray = media === null ? [] : Object.entries(media)

  useEffect(() => {
    setLoading(false)
    readFromDB('media/', setMedia, setLoading)
  }, [])

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
            {[1, 2, 3].map((item) => {
              return (
                <li key={item} className="mx-4">
                  <button type="button" onClick={() => paginateArray(item)}>
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
