import Script from 'next/script'
import { memo } from 'react'

function ProductReviewsComponent() {
  return (
    <div className="product-reviews mx-auto justify-center items-center">
      <Script
        src="https://en.trustmate.io/api/widget/5c6b265a-9520-4676-9d01-2ecfca53d95c/script"
        strategy="lazyOnload"
        id="trustmate-widget-script-1"
      />
      <div className="flex items-center">
        <div id="5c6b265a-9520-4676-9d01-2ecfca53d95c"></div>
      </div>
    </div>
  )
}
const ProductReviews = memo(ProductReviewsComponent)
export default ProductReviews
