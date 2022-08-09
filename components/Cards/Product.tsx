/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import Image from '@/components/Image'
import FormattedPrice from '@/components/Price/FormattedPrice'
import DiscountTag from '@/components/Tag/DiscountTag'
import { useMediaQuery } from '@/hooks'
import useAlgoliaEvent from '@/hooks/useAlgoliaEvent'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { ProductProps } from '@/typings/types'

interface ProductTypes extends ProductProps {
  row?: boolean
  className?: string
  color?: string
  smallerImage?: boolean
  imageClassName?: string
  tags?: string[]
}

// function hasNumber(text: string) {
//   return /\d/.test(text)
// }

export default function Product({
  product,
  className,
  row,
  color,
  imageClassName,
}: ProductTypes) {
  const { algoliaEvent } = useAlgoliaEvent()
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { addItemToCart } = useShoppingCart()

  const isRow = row ? 'flex' : 'flex flex-col'
  const isRowText = row ? 'ml-4' : ''
  const imageWidth = row ? 'w-1/2' : ''
  const productClassName = className ? className : ''
  const productImageClassName = imageClassName ? imageClassName : ''
  const imageSize = mobileWidth
    ? {
        height: 120,
        width: 120,
      }
    : {
        height: 200,
        width: 200,
      }

  const addToCartHandler = () => {
    addItemToCart.mutate({ product, quantity: 1 })
  }

  function algoliaEventHandler() {
    algoliaEvent('clickedObjectIDs', 'Product Clicked', product?.objectID)
    algoliaEvent('viewedObjectIDs', 'Product Viewed', product?.objectID)
  }

  const productImage =
    typeof product?.images[0] === 'string'
      ? product?.images[0]
      : product?.images[0].file.url

  return (
    <>
      <div
        className={`hover:bg-white mr-4 px-2 relative hover:shadow-lg product hover:rounded-lg product ${productClassName}  ${isRow} p-2 md:p-4 lg:p-6 hover:border`}
      >
        <DiscountTag price={product.price} salePrice={product.sale_price} />
        <Link passHref href={`/product/${product.slug}`}>
          <a
            title={product.name}
            className="product-view"
            onClick={algoliaEventHandler}
          >
            <div
              className={`${productImageClassName} ${imageWidth} image-wrapper`}
            >
              {product.images[0] && (
                <Image
                  src={productImage}
                  alt={product.name}
                  height={imageSize.height}
                  width={imageSize.width}
                  blurDataURL={productImage}
                  placeholder="blur"
                  layout="responsive"
                  loading="lazy"
                />
              )}
            </div>
            <div className={`${isRowText} ${imageWidth} text`}>
              {/* <Link passHref href={productVendorLink}> */}
              <span
                // aria-label="vendor"
                // type="button"
                className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 mb-1 md:mb-0 md:h-5"
              >
                {product.vendor}
              </span>
              {/* </Link> */}
              <div className="product-name-view md:mb-4 mb-2">
                <h3 className="text-xs md:text-md product-name">
                  {product.name}
                </h3>
              </div>
              <div className="price-group flex flex-col md:flex-row items-start md:items-center justify-between px-0">
                <FormattedPrice
                  price={product.sale_price}
                  className="text-xs md:text-sm my-1 md:my-0 lg:text-md text-black font-semibold"
                />
                {product.price !== 0 && (
                  <FormattedPrice
                    price={product.price}
                    className="text-xs md:text-sm my-1 md:my-0 strike-through lg:text-md text-red-500 font-semibold"
                  />
                )}
              </div>
            </div>
          </a>
        </Link>
        <button
          type="button"
          aria-label="add to cart"
          className="bg-mountain-green add-to-cart mt-4 w-full md:w-4/5 justify-center h-8 text-white px-4 py-1 flex items-center mx-auto rounded-md"
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
    </>
  )
}
