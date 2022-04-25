import productReview from "@/json/product-review.json";
import RatingStar from "@/components/Rating/RatingStar";

export default function ProductReviewView() {
  return (
    <div>
      {productReview.reviews.map((review) => (
        <div key={review.name} className="product-review pb-4 mb-4 border-b-4">
          <div className="flex mb-3">
            <div className="flex items-center me-4 pe-2">
              <img
                className="rounded-circle"
                src={review.authorImage}
                width="50"
                alt={review.name}
              />
              <div className="ps-3">
                <h6 className="fs-sm mb-0">{review.name}</h6>
                <span className="fs-ms text-gray-500">{review.date}</span>
              </div>
            </div>
            <div>
              <RatingStar rate={review.rating} />
              <div className="fs-ms text-gray-500">{review.note}</div>
            </div>
          </div>
          <p className="fs-md mb-2">{review.text}</p>
          <ul className="list-unstyled fs-ms pt-1">
            <li className="mb-1">
              <span className="fw-medium">Pros:&nbsp;</span>
              {review.pros}
            </li>
            <li className="mb-1">
              <span className="fw-medium">Cons:&nbsp;</span>
              {review.cons}
            </li>
          </ul>
          <div className="text-nowrap">
            <button
              aria-label="review like button"
              className="btn-like"
              type="button"
            >
              {review.like}
            </button>
            <button
              aria-label="review dislike button"
              className="btn-dislike"
              type="button"
            >
              {review.dislike}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
