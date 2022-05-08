/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link'

import Image from '@/components/Image'
import useAlgoliaEvents from '@/hooks/useAlgoliaEvents'
import type { productType } from '@/types'

import ProductListView from './ProductListView'

interface ProductProps {
  product: productType
}

export default function ProductList({ product }: ProductProps) {
  const { itemViewed } = useAlgoliaEvents()

  function productViewedHandler() {
    itemViewed('product_viewed', [product.objectID])
  }

  const imageAlt = product?.image_alt_text
    ? product?.image_alt_text[0]
    : product.name

  return (
    <div className="product-list w-full mb-4 px-4 py-2 hover:shadow-lg border-b-2 justify-center">
      <span className="bg-red-500 shadow-lg text-white p-2 mx-1 rounded-lg">
        Sale
      </span>
      <button
        className="btn-wishlist btn-sm"
        type="button"
        aria-label="Add to Wishlist"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Add to wishlist"
      >
        <i className="ci-heart"></i>
      </button>
      <div className="flex flex-col md:flex-row items-center">
        <Link passHref href={`/products/${product.slug}`}>
          <a
            aria-label={imageAlt}
            className="product-list-thumb h-1/3 md:h-full"
            onClick={productViewedHandler}
          >
            <Image
              height={300}
              width={300}
              src={product.images[0]}
              alt={imageAlt}
              className="productImage"
              placeholder="blur"
              blurDataURL={product.images[0]}
              loading="lazy"
            />
          </a>
        </Link>
        <ProductListView product={product} />
      </div>
    </div>
  )
}
