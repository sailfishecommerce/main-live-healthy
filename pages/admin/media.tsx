/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Dropzonebar from '@/components/Dropzonebar'
import useMediaUpload from '@/hooks/useMediaUpload'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'
import Image from 'next/image'

export default function Media() {
  const { dropzone, style, isUploadSuccessful } = useMediaUpload()
  const [media, setMedia] = useState<any>(null)
  const { readFromDB } = firebaseDatabase()

  const mediaArray = media === null ? [] : Object.values(media)

  console.log('mediaArray', mediaArray)

  useEffect(() => {
    readFromDB('media/', setMedia)
  }, [])

  return (
    <DashboardLayout title="Upload Media page">
      <DashboardMainView>
        <h4 className="text-center font-bold text-xl">
          Upload Images, copy image link to your blog post and about-us page
        </h4>
        <div className="content mt-6 flex">
          <div className="w-2/6 ">
            <Dropzonebar
              style={style}
              dropzone={dropzone}
              fileType="images"
              uploadStatus={isUploadSuccessful}
            />
          </div>
          <div className="w-4/6 ml-8 border-l-2 pl-8 h-screen">
            {media === null ? (
              <h6 className="text-center font-medium text-lg">
                No media uploaded yet
              </h6>
            ) : (
              <div className="media gap-5 border p-4 grid grid-cols-2">
                {mediaArray.map((mediaItem: any) => {
                  const parsedMediaItem = JSON.parse(mediaItem)
                  return (
                    <div className="image-wrapper" key={parsedMediaItem}>
                      <img src={parsedMediaItem} alt="media-image" />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
