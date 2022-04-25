import Image from 'next/image'

import Stars from '@/components/Icons/Stars'

interface Props {
  ratings: number
}

export default function Ratings({ ratings }: Props) {
  const unfilledStars = 5 - Number(ratings)
  const filledStarsArray = new Array(ratings).fill(0)
  const unfilledStarsArray = new Array(unfilledStars).fill(0)
  return (
    <div className="star-group flex items-center">
      {filledStarsArray.map((_, index) => (
        <Image
          src="/filled-star.png"
          key={index}
          className="mx-1"
          height={20}
          alt="star"
          width={20}
        />
      ))}
      {unfilledStarsArray.map((_, index) => (
        <Stars key={index} fill="none" />
      ))}
    </div>
  )
}
