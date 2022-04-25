import classNames from 'classnames'
import type { MouseEventHandler } from 'react'
import { useCallback } from 'react'

import { ProductColorVariationList } from '@/components/Product/product-color-variation-list'
import { ProductDescription } from '@/components/Product/product-description'
import { ProductImage } from '@/components/Product/product-image'
import { ProductLabel } from '@/components/Product/product-label'
import type { ProductPriceCurrency } from '@/components/Product/product-price'
import { ProductPrice } from '@/components/Product/product-price'
import { ProductRating } from '@/components/Product/product-rating'
import type { ProductTagType } from '@/components/Product/product-tag'
import { ProductTag } from '@/components/Product/product-tag'
import { ProductTitle } from '@/components/Product/product-title'
import type { ViewMode } from '@/components/ViewModes'
import { Link } from '@ui/link/link'

export type ProductCardProps = {
  url?: string
  image?: string
  tags?: ProductTagType[]
  label?: string
  labelHighlighting?: React.ComponentType
  title?: string
  titleHighlighting?: React.ComponentType
  description?: string
  descriptionSnippeting?: React.ComponentType
  colors?: string[]
  price?: number
  originalPrice?: number
  currency?: ProductPriceCurrency
  rating?: number
  reviews?: number
  available?: boolean
  view?: ViewMode
  onLinkClick?: MouseEventHandler<HTMLElement>
}

export function ProductCard({
  url = '',
  image,
  tags,
  label,
  labelHighlighting,
  title,
  titleHighlighting,
  description,
  descriptionSnippeting,
  colors,
  price,
  originalPrice,
  currency,
  rating,
  reviews,
  available = true,
  view = 'grid',
  onLinkClick,
}: ProductCardProps) {
  const handleLinkClick = useCallback(
    (e) => {
      if (typeof onLinkClick === 'function') onLinkClick(e)
    },
    [onLinkClick]
  )

  return (
    <article
      className={classNames(
        'w-full h-full hover:shadow-lg relative border border-transparent transition-all lg:p-3 group hover:lg:hover:shadow-lg hover:lg:hover:rounded-lg hover:lg:hover:border-neutral-light',
        { 'opacity-50': !available }
      )}
    >
      <Link
        href={url}
        title={`buy ${title}`}
        className={classNames('flex gap-2', {
          'flex-col': view === 'grid',
          'flex-row items-start': view === 'list',
        })}
        onClick={handleLinkClick}
      >
        <div
          className={classNames('relative', {
            'w-32 h-auto flex-shrink-0': view === 'list',
          })}
        >
          {image && <ProductImage src={image} alt={title} />}

          {tags && tags.length > 0 && (
            <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
              {tags.map((tag) => (
                <ProductTag
                  key={tag.label}
                  label={tag.label}
                  theme={tag.theme}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <header className="flex flex-col gap-1">
            {(label || labelHighlighting) && (
              <ProductLabel highlighting={labelHighlighting}>
                {label}
              </ProductLabel>
            )}
            {(title || titleHighlighting) && (
              <ProductTitle highlighting={titleHighlighting}>
                {title}
              </ProductTitle>
            )}
            {(description || descriptionSnippeting) && view === 'list' && (
              <ProductDescription snippeting={descriptionSnippeting}>
                {description}
              </ProductDescription>
            )}
          </header>

          <footer className="flex flex-col gap-1">
            {colors && <ProductColorVariationList colors={colors} />}
            {price && (
              <ProductPrice
                price={price}
                originalPrice={originalPrice}
                currency={currency}
              />
            )}
            {typeof rating !== 'undefined' && (
              <ProductRating rating={rating} reviews={reviews} />
            )}
          </footer>
        </div>
      </Link>
    </article>
  )
}
