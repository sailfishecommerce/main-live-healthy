import RatingStar from './RatingStar'

export default function Rating({ product }: any) {
  const reviews = product && product?.review_rating > 1 ? 'Reviews' : 'Review'
  return (
    <a aria-label="product rating" href="#reviews" className="flex">
      {product?.rating && <RatingStar rate={product?.rating} />}
      <span className="d-inline-block fs-sm text-body align-middle mt-1 ms-1">
        {product?.review_rating} {reviews}
      </span>
    </a>
  )
}
