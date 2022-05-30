import Script from 'next/script'

import ReviewBars from '@/components/Reviews/ReviewBars'

interface Props {
  rating: number
}

export default function ProductReview({ rating }: Props) {
  const reviewsStat = [
    { count: 5 },
    { count: 4 },
    { count: 3 },
    { count: 2 },
    { count: 1 },
  ]

  function displayReviewBar(reviewCount: number) {
    let ratingBarWidth: number
    if (reviewCount === rating) {
      ratingBarWidth = (rating / 5) * 100
      return ratingBarWidth
    }
    return 0
  }

  return (
    <div className="w-full my-2 px-4 md:px-0">
      <h3 className="font-bold text-xl my-2">Reviews</h3>
      <div className="trustmate-reviews flex flex-col md:flex-row items-center">
        <div className="trust-mate md:w-1/5 w-full">
          <Script
            src="https://trustmate.io/api/widget/0be02447-549c-4b3d-96b1-3afbef251b11/script"
            strategy="lazyOnload"
            id="trustmate-widget-script-1"
          />
          <div id="0be02447-549c-4b3d-96b1-3afbef251b11"></div>
        </div>
        <div className="review-bar md:w-4/5 w-full flex flex-col">
          {reviewsStat.map((review) => (
            <ReviewBars
              key={review.count}
              count={review.count}
              barWidth={displayReviewBar(review.count)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
