import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
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
  smallerImage,
  imageClassName,
}: ProductHitTypes) {
  const isRow = row ? 'flex' : 'flex flex-col'
  const isRowText = row ? 'ml-4' : ''
  // const buttonClass = row ? 'mt-1' : 'mt-4'
  const imageWidth = row ? 'w-1/2' : ''
  const productClassName = className ? className : ''
  const productImageClassName = imageClassName ? imageClassName : ''
  const imageSize = smallerImage
    ? {
        height: 300,
        width: 300,
      }
    : {
        height: 500,
        width: 500,
      }

  const { addItemToCart } = useShoppingCart()
  const productImage =
    typeof hit.images[0] === 'string' ? hit.images[0] : hit.images[0].file.url

  const addToCartHandler = () =>
    addItemToCart.mutate({ product: hit, quantity: 1 })
  const productVendorLink = hit?.vendor?.includes(' ')
    ? `/search/${hit.vendor}`
    : `/vendor/${hit.vendor}`
  return (
    <div
      className={`hover:bg-white hover:shadow-lg product hover:rounded-lg product ${productClassName}  ${isRow} p-2 md:p-6 hover:border`}
    >
      <Link passHref href={`/product/${hit.slug}?queryID=${hit.__queryID}`}>
        <a title={hit.name}>
          <div
            className={`${productImageClassName} ${imageWidth}  image-wrapper`}
          >
            <Image
              src={productImage}
              alt={hit.name}
              height={imageSize.height}
              width={imageSize.width}
              blurDataURL={hit.images[0]}
            />
          </div>
          <div className={`${isRowText} ${imageWidth} text`}>
            <Link passHref href={productVendorLink}>
              <button
                type="button"
                className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 h-3 mb-1 md:mb-0 md:h-5"
              >
                {hit?.vendor}
              </button>
            </Link>
            <div className="product-name-view md:mb-8 mb-2">
              <h3 className="text-xs md:text-md product-name">{hit.name}</h3>
            </div>
            {hit?.price && (
              <FormattedPrice
                price={hit.sale_price}
                className="text-sm md:text-md text-black font-semibold"
              />
            )}
          </div>
        </a>
      </Link>
      <button
        type="button"
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
