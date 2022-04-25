import FormattedPrice from '@/components/Price/FormattedPrice'
import RatingStar from '@/components/Rating/RatingStar'

export default function ProductPriceView({ product }: any) {
  return (
    <div className="flex justify-between flex-col tablet:flex-row">
      <ul className="product-price flex flex-col items-start justify-between">
        <li className="text-md font-medium">
          <div className="text-blue-800">
            <FormattedPrice
              isProduct
              className="font-bold text-sm"
              price={product.price}
            />
          </div>
        </li>
        {product.rrp && (
          <li className="text-left -mt-2">
            <del className="text-md text-blue-800">
              <FormattedPrice
                isProduct
                price={product.rrp}
                className="tablet:text-sm text-xs"
              />
            </del>
          </li>
        )}
      </ul>
      <div className="reviewRating flex flex-col">
        <RatingStar rate={product.rating} />
        {product.review_rating ? (
          <p className="text-sm">
            {product.review_rating === 1
              ? `${product.review_rating} review`
              : `${product.review_rating} reviews`}
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
