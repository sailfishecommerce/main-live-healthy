/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import searchInsights from 'search-insights'

import type { ProductTagType } from '@/components/Product/product-tag'
import type { HitComponentProps, ProductHit } from '@/typings/hits'
import { indexName } from '@/utils/env'

import { ProductDetail } from './product-detail'
import type { ProductDetailProps } from './product-detail'

export type ProductDetailHitProps = HitComponentProps<ProductHit>

export function ProductDetailHit({ hit }: ProductDetailHitProps) {
  const product: ProductDetailProps = {
    image: hit?.images[0],
    label: hit?.brand,
    title: hit?.name,
    description: hit?.description,
    tags: [],
    sizes: [],
    rating: hit?.reviews?.rating,
    reviews: hit?.reviews?.count,
    price: hit?.price,
    currency: {
      symbol: '$',
      position: 'prefix',
    },
  }

  // On sales
  if (hit?.price) {
    product.originalPrice = hit?.price
    product.price = hit?.price

    product.tags?.push({
      label: `on sale ${hit?.price}%`,
      theme: 'on-sale',
    } as ProductTagType)
  }

  // Tags
  if (product.reviews && product.reviews >= 90) {
    product.popular = true
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  // Sizes
  if (hit?.available_sizes?.length) {
    product.sizes?.push(
      ...hit?.available_sizes.map((size) => ({ size, available: true }))
    )
  }

  const router = useRouter()
  const queryID = router?.query?.queryID as string

  const handleCheckoutClick = useCallback(() => {
    searchInsights(
      queryID ? 'convertedObjectIDsAfterSearch' : 'convertedObjectIDs',
      {
        index: indexName,
        eventName: queryID
          ? 'PDP: Product Added to Cart after Search'
          : 'PDP: Product Added to Cart',
        objectIDs: [hit?.objectID],
        queryID,
      }
    )
  }, [queryID, hit?.objectID])

  return <ProductDetail {...product} onCheckoutClick={handleCheckoutClick} />
}
