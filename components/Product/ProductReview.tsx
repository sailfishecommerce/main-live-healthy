import Script from 'next/script'

import ReviewBars from '@/components/Reviews/ReviewBars'

export default function ProductReview() {
  const reviewsStat = [
    { count: 5, barWidth: 68 },
    { count: 4, barWidth: 15 },
    { count: 3, barWidth: 5 },
    { count: 2, barWidth: 2 },
    { count: 1, barWidth: 0 },
  ]
  return (
    <div className="w-full my-2 px-4 md:px-0">
      <h3 className="font-bold text-xl my-2">Reviews</h3>
      <div className="trustmate-reviews flex flex-col md:flex-row items-center">
        <div className="trust-mate md:w-1/5 w-full">
          <Script
            src="https://trustmate.io/api/widget/f28f0f77-0b7d-4700-a67f-2b9ae13a7a1d/script?product=tu_wstaw_identyfikator_produktu"
            strategy="lazyOnload"
            id="trustmate-widget-script-1"
          />
          <div id="f28f0f77-0b7d-4700-a67f-2b9ae13a7a1d"></div>
        </div>
        <div className="review-bar md:w-4/5 w-full flex flex-col">
          {reviewsStat.map((review) => (
            <ReviewBars
              key={review.count}
              count={review.count}
              barWidth={review.barWidth}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
