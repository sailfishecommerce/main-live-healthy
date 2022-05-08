import Image from 'next/image'
import React from 'react'

import Ratings from '@/components/Reviews/Ratings'

interface Props {
  choice: {
    time: string
    username: string
    rating: number
    review: string
    img: string
  }
}

export default function UserChoiceCard({ choice }: Props) {
  return (
    <div className="border border-gray-200 mr-8 p-4 flex flex-col rounded-xl justify-center items-center">
      {choice.img && (
        <div className="imagewrapper mb-2 border-b pb-4">
          <Image
            src={choice.img}
            alt={choice.username}
            height={250}
            width={250}
            blurDataURL={choice.img}
          />
        </div>
      )}
      <hr className="border-b border-gray-200 mx-4" />
      <div className="user-review flex flex-col items-center">
        <h4 className="font-bold text-xl my-2">{choice.username}</h4>
        <Ratings ratings={choice.rating} />
        <p className="text-md mb-2 text-center mt-4">{choice.review}</p>
        <p className="text-sm text-gray-400">{choice.time}</p>
      </div>
    </div>
  )
}
