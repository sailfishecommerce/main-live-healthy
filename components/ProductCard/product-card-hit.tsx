import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import type { WrappedInsightsClient } from 'react-instantsearch-core'
import { Highlight, connectHitInsights, Snippet } from 'react-instantsearch-dom'
import searchInsights from 'search-insights'

import type { ProductTagType } from '@/components/Product/product-tag'
import type { ProductCardProps } from '@/components/ProductCard/product-card'
import { ProductCard } from '@/components/ProductCard/product-card'
import type { ViewMode } from '@/components/ViewModes'
import type { HitComponentProps, ProductHit } from '@/typings/hits'

export type ProductCardHitProps = HitComponentProps<ProductHit> & {
  insights: WrappedInsightsClient
  insightsEventName?: string
  viewMode?: ViewMode
  highlighting?: boolean
  snipetting?: boolean
}

export function ProductCardHitComponent({
  hit,
  insights,
  insightsEventName = 'PLP: Product Clicked',
  viewMode,
  highlighting = true,
  snipetting = true,
}: ProductCardHitProps | any) {
  const product: ProductCardProps = {
    url: `/product/${hit?.slug}?queryID=${hit?.__queryID}`,
    image: hit?.images[0]?.file?.url,
    tags: [],
    colors: [],
    price: hit?.price,
    currency: {
      symbol: hit?.price?.currency === 'EUR' ? '€' : '$',
      position: hit?.price?.currency === 'EUR' ? 'suffix' : 'prefix',
    },
    title: hit.name,
    rating: hit.rating,
    reviews: hit?.reviews_rating,
  }

  // On sales
  if (hit?.price?.on_sales) {
    product.originalPrice = hit?.price
    product.price = hit?.price?.discounted_value

    // product.tags?.push({
    //   label: `on sale ${hit?.price?.discount_level}%`,
    //   theme: 'on-sale',
    // } as ProductTagType)
  }

  // Highlighting
  if (highlighting) {
    product.labelHighlighting = () => (
      <Highlight attribute="vendor" tagName="mark" hit={hit} />
    )

    product.titleHighlighting = () => (
      <Highlight attribute="name" tagName="mark" hit={hit} />
    )
  } else {
    product.label = hit?.vendor
    product.title = hit?.name
  }

  // Snipetting
  if (snipetting) {
    product.descriptionSnippeting = () => (
      <Snippet attribute="description" hit={hit} />
    )
  } else {
    product.description = hit?.description
  }

  // Tags
  if (product.reviews && product.reviews >= 90) {
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  // Colors
  if (hit?.color?.filter_group) {
    product.colors?.push(hit?.color.filter_group.split(';')[1])
  }

  const handleLinkClick = useCallback(() => {
    insights('clickedObjectIDsAfterSearch', {
      eventName: insightsEventName,
    })
  }, [insights, insightsEventName])

  return (
    <ProductCard view={viewMode} onLinkClick={handleLinkClick} {...product} />
  )
}

export const ProductCardHit = connectHitInsights<ProductCardHitProps>(
  searchInsights
)(memo(ProductCardHitComponent, isEqual))

export function ProductCardHitShowcase(props: ProductCardHitProps) {
  return (
    <ProductCardHit
      {...props}
      highlighting={false}
      insightsEventName="Showcase: Product Clicked"
    />
  )
}
