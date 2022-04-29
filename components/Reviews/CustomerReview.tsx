import Ratings from '@/components/Reviews/Ratings'

interface Props {
  reviews: number
  ratings: number
}
export default function CustomerReview({ reviews, ratings }: Props) {
  const reviewText = reviews > 1 ? 'reviews' : 'review'
  return (
    <div className="customer-review flex items-center my-2">
      {ratings && <Ratings ratings={ratings} />}
      {reviews > 0 && (
        <p className="ml-2 mountain-mist">
          {reviews} customer&#39;s {reviewText}
        </p>
      )}
    </div>
  )
}
