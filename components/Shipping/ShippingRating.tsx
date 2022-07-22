import Ratings from '@/components/Reviews/Ratings'

interface Props {
  text: string
  rating: number
}

export default function ShippingRating({ rating, text }: Props) {
  return (
    <>
      {rating > 0 && (
        <span className="flex w-3/4 justify-between">
          <p>{text}: </p>
          <Ratings ratings={rating} />
        </span>
      )}
    </>
  )
}
