/* eslint-disable react/no-array-index-key */
import Image from 'next/image'
import { BsStarHalf } from 'react-icons/bs'

import Stars from '@/components/Icons/Stars'

interface Props {
  ratings: number
}

export default function Ratings({ ratings }: Props) {
  const ratingRemainder = ratings % 1
  const ratingValue = Math.floor(ratings)
  const unfilledStars = 5 - Number(ratingValue)
  const numberOfunfilledStars =
    ratingRemainder > 0 ? unfilledStars - 1 : unfilledStars
  const filledStarsArray = new Array(ratingValue).fill(0)
  const unfilledStarsArray = new Array(numberOfunfilledStars).fill(0)

  return (
    <div className="star-group flex items-center">
      {filledStarsArray.map((_, index) => (
        <Image
          key={index}
          src="/filled-star.png"
          className="mx-1"
          height={20}
          alt="star"
          width={20}
        />
      ))}
      {ratingRemainder > 0 && <BsStarHalf size="20px" color="orange" />}
      {unfilledStarsArray.map((_, index) => (
        <Stars key={index} fill="none" />
      ))}
    </div>
  )
}
