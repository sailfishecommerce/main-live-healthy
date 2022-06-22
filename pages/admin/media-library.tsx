/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import Dropzonebar from '@/components/Dropzonebar'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import MediaImage from '@/components/MediaImage'
import useMediaUpload from '@/hooks/useMediaUpload'
import DashboardLayout from '@/layouts/dashboard-layout'
import firebaseDatabase from '@/lib/firebaseDatabase'

export default function Media() {
  const { dropzone, style, isUploadSuccessful } = useMediaUpload()
  const [media, setMedia] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { readFromDB } = firebaseDatabase()

  const mediaArray = media === null ? [] : Object.entries(media)

  useEffect(() => {
    setLoading(false)
    readFromDB('media/', setMedia, setLoading)
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
            {loading ? (
              <SpinnerRipple centerRipple />
            ) : mediaArray.length > 0 ? (
              <div className="media gap-5 border p-4 grid grid-cols-2">
                {mediaArray.map(([imageKey, image]: any) => {
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
            ) : (
              <h6 className="text-center font-medium text-lg">
                No media uploaded yet
              </h6>
            )}
          </div>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  )
}
