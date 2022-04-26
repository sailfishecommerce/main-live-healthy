import classNames from 'classnames'
import dynamic from 'next/dynamic'
import type { MouseEventHandler } from 'react'
import { useCallback } from 'react'

import CartIcon from '@/components/Icons/CartIcon'
import { ProductColorVariationList } from '@/components/Product/product-color-variation-list'
import { ProductDescription } from '@/components/Product/product-description'
import { ProductImage } from '@/components/Product/product-image'
import { ProductLabel } from '@/components/Product/product-label'
import type { ProductPriceCurrency } from '@/components/Product/product-price'
import { ProductRating } from '@/components/Product/product-rating'
import type { ProductTagType } from '@/components/Product/product-tag'
import { ProductTag } from '@/components/Product/product-tag'
import { ProductTitle } from '@/components/Product/product-title'
import type { ViewMode } from '@/components/ViewModes'
import useShoppingCart from '@/hooks/useShoppingCart'
import { Link } from '@ui/link/link'

const DynamicFormattedPrice = dynamic(
  () =>
    import(
      /* webpackChunkName: 'FormattedPrice' */ '@/components/Price/FormattedPrice'
    ),
  {
    ssr: false,
  }
)

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
  product?: any
  onLinkClick?: MouseEventHandler<HTMLElement>
}

export default function ProductCard({
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
  rating,
  reviews,
  available = true,
  product,
  view = 'grid',
  onLinkClick,
}: ProductCardProps) {
  const handleLinkClick = useCallback(
    (e) => {
      if (typeof onLinkClick === 'function') onLinkClick(e)
    },
    [onLinkClick]
  )

  const { loadingState, addItemToCart } = useShoppingCart()

  loadingState(addItemToCart, `${title} added to cart`)

  const addToCartHandler = () => addItemToCart.mutate({ product, quantity: 1 })

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
        <a
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
        </a>
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
      </Link>
      <footer className="flex flex-col gap-1">
        {colors && <ProductColorVariationList colors={colors} />}
        {price && (
          <DynamicFormattedPrice
            className="font-bold lg:text-xs"
            price={price}
          />
        )}
        <button
          type="button"
          className="bg-mountain-green mt-4 w-full md:w-4/5 justify-center h-8 text-white px-4 py-1 flex items-center mx-auto rounded-md"
          onClick={addToCartHandler}
        >
          <CartIcon />
          <p className="text-xs md:text-sm">Add to cart</p>
        </button>
        {typeof rating !== 'undefined' && (
          <ProductRating rating={rating} reviews={reviews} />
        )}
      </footer>
    </article>
  )
}
