/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { IoCopySharp } from 'react-icons/io5'
import { toast } from 'react-toastify'

import firebaseDatabase from '@/lib/firebaseDatabase'

interface Props {
  parsedMediaItem: {
    url: string
    public_id: string
    signature: string
    version: number
  }
  imageKey: string
}

export default function MediaImage({ parsedMediaItem, imageKey }: Props) {
  const [hover, setHover] = useState(false)

  const { url } = parsedMediaItem

  function copyImageLinkHandler() {
    navigator.clipboard
      .writeText(parsedMediaItem.url)
      .then(() => toast.success('image link copied'))
  }

  function deleteImageHandler() {
    const { deleteItemFromDB } = firebaseDatabase()
    deleteItemFromDB(`media/${imageKey}`).then(() =>
      toast.success('image deleted')
    )
  }

  return (
    <>
      <div
        className="image-wrapper"
        key={parsedMediaItem.public_id}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && (
          <div className="hover-view">
            <div className="content">
              <button
                type="button"
                className="wrapper"
                onClick={copyImageLinkHandler}
              >
                <IoCopySharp title="Copy image link" color="white" size={26} />
              </button>
              <button
                type="button"
                className="wrapper"
                onClick={deleteImageHandler}
              >
                <AiFillDelete title="Delete Image" color="white" size={26} />
              </button>
            </div>
          </div>
        )}
        <img src={url} alt="media-image" />
      </div>
      <style jsx>
        {`
          .hover-view {
            height: 100%;
            width: 100%;
            display: flex;
            position: absolute;
            top: 0px;
            left: 0;
            background-color: #e9e3e378;
            z-index: 10;
            justify-content: space-around;
            align-items: center;
          }
          button.wrapper {
            height: 40px;
            width: 40px;
            background-color: var(--color-14);
            border-radius: 50%;
            display: flex;
            padding: 5px;
            align-items: center;
            justify-content: center;
          }
          button.wrapper:hover {
            background-color: var(--color-1);
          }
          .content {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 100%;
            z-index: 100;
            width: 100%;
          }
          .image-wrapper {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
    </>
  )
}
