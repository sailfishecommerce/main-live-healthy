/* eslint-disable @next/next/no-img-element */
import FormattedPrice from '@/components/Price/FormattedPrice'

import Link from 'next/link'

interface Props {
  content: {
    image: string
    link: string
    title: string
    brand?: string
    color: string
    price: number
    size?: number
  }
}

export default function WishlistItem({ content }: Props) {
  return (
    <div className="d-sm-flex justify-between mt-lg-4 mb-4 pb-3 pb-sm-2 border-b-4">
      <div className="d-block d-sm-flex align-items-start text-center text-sm-start">
        <Link passHref href={content.link}>
          <a
            aria-label={content.title}
            className="wishlistLink d-block flex-shrink-0 mx-auto me-sm-4"
          >
            <img src={content.image} alt="Product" />
          </a>
        </Link>
        <div className="pt-2">
          <h3 className="product-title fs-base mb-2">
            <Link passHref href={content.link}>
              <a>{content.title}</a>
            </Link>
          </h3>
          {content.brand && (
            <div className="fs-sm">
              <span className="text-gray-500 mx-2">Brand:</span>
              {content.brand}
            </div>
          )}
          <div className="fs-sm">
            <span className="text-gray-500 mx-2">Color:</span>
            {content?.color}
          </div>
          {content.size && (
            <div className="fs-sm">
              <span className="text-gray-500 mx-2">Size:</span>
              {content.size}
            </div>
          )}
          <FormattedPrice price={content.price} />
        </div>
      </div>
      <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
        <button
          aria-label="Remove"
          className="btn btn-outline-danger btn-sm"
          type="button"
        >
          <i className="ci-trash mx-2"></i>Remove
        </button>
      </div>
      <style jsx>
        {`
          .wishlistLink {
            width: 10rem;
          }
        `}
      </style>
    </div>
  )
}
