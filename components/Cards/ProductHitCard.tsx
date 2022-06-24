/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import Image from '@/components/Image'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { useMediaQuery } from '@/hooks'
import useAlgoliaEvent from '@/hooks/useAlgoliaEvent'
import useShoppingCart from '@/hooks/useShoppingCart'

interface ProductHitTypes {
  row?: boolean
  hit?: any
  className?: string
  color?: string
  smallerImage?: boolean
  imageClassName?: string
}

export default function ProductHitCard({
  hit,
  className,
  row,
  color,
  imageClassName,
}: ProductHitTypes) {
  const { algoliaEvent } = useAlgoliaEvent()
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const isRow = row ? 'flex' : 'flex flex-col'
  const isRowText = row ? 'ml-4' : ''
  const imageWidth = row ? 'w-1/2' : ''
  const productClassName = className ? className : ''
  const productImageClassName = imageClassName ? imageClassName : ''

  const imageSize = mobileWidth
    ? {
        height: 150,
        width: 150,
      }
    : {
        height: 200,
        width: 200,
      }

  const { addItemToCart } = useShoppingCart()
  const productImage =
    typeof hit.images[0] === 'string' ? hit.images[0] : hit.images[0].file.url

  const addToCartHandler = () => {
    algoliaEvent(
      'convertedObjectIDsAfterSearch',
      'Product Added to cart after search',
      hit.objectID,
      hit.__queryID,
      hit.__position
    )
    addItemToCart.mutate({ product: hit, quantity: 1 })
  }

  const productVendorLink = hit.vendor.includes(' ')
    ? `/search/${hit.vendor}`
    : `/vendor/${hit.vendor}`

  function algoliaEventHandler() {
    algoliaEvent(
      'clickedObjectIDsAfterSearch',
      'Product Added to cart after search',
      hit.objectID,
      hit.__queryID,
      hit.__position
    )
  }

  return (
    <div
      className={`hover:bg-white hover:shadow-lg product hover:rounded-lg product ${productClassName}  ${isRow} p-2 md:p-6 hover:border`}
    >
      <Link
        passHref
        href={`/product/${hit.slug}?queryID=${hit.__queryID}?position=${hit.__position}`}
      >
        <a title={hit.name} onClick={algoliaEventHandler}>
          <div
            className={`${productImageClassName} ${imageWidth} flex justify-center mx-auto mb-4 image-wrapper`}
          >
            <Image
              src={productImage}
              alt={hit.name}
              height={imageSize.height}
              width={imageSize.width}
              blurDataURL={hit.images[0]}
              placeholder="blur"
            />
          </div>
          <div className={`${isRowText} ${imageWidth} text`}>
            <Link passHref href={productVendorLink}>
              <button
                type="button"
                aria-label="vendor"
                className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 mb-1 md:mb-0 md:h-5"
              >
                {hit?.vendor}
              </button>
            </Link>
            <div className="product-name-view md:mb-8 mb-2">
              <h3 className="text-xs md:text-md product-name">{hit.name}</h3>
            </div>
            <div className="price-group flex flex-col md:flex-row items-start md:items-center justify-between px-0">
              <FormattedPrice
                price={hit.sale_price}
                className="text-xs md:text-sm my-1 md:my-0 lg:text-md text-black font-semibold"
              />
              {hit.price !== 0 && (
                <FormattedPrice
                  price={hit.price}
                  className="text-xs md:text-xs my-1 md:my-0 strike-through lg:text-md text-red-500 font-semibold"
                />
              )}
            </div>
          </div>
        </a>
      </Link>
      <button
        type="button"
        aria-label="add to cart"
        className="bg-mountain-green mt-4 w-full md:w-4/5 justify-center h-8 text-white px-4 py-1 flex items-center mx-auto rounded-md"
        onClick={addToCartHandler}
      >
        <CartIcon />
        <p className="text-xs md:text-sm">Add to cart</p>
      </button>
      <style jsx>
        {`
          .product {
            font-family: 'Commissioner', sans-serif;
            font-display: swap;
          }
          .vendor {
            border-left: 3px solid ${color};
            color: ${color};
          }
          @media (max-width: 500px) {
            a.product {
              width: 90%;
              margin: 0px;
            }
          }
        `}
      </style>
    </div>
  )
}
