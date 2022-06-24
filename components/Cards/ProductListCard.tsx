import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
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
}

export default function ProductListCard({
  hit,
  className,
  color,
  smallerImage,
}: ProductHitTypes) {
  const { algoliaEvent } = useAlgoliaEvent()
  const { addItemToCart } = useShoppingCart()

  const productClassName = className ? className : ''
  const imageSize = smallerImage
    ? {
        height: 300,
        width: 300,
      }
    : {
        height: 300,
        width: 300,
      }

  const productImage =
    typeof hit?.images[0] === 'string'
      ? hit?.images[0]
      : hit?.images[0]?.file?.url

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

  const productVendorLink = hit?.vendor?.includes(' ')
    ? `/search/${hit.vendor}`
    : `/collection/${hit.vendor}`

  const isMobile = useMediaQuery('max-width:768px')
  const productTClassName = isMobile ? 'p-name' : 'product-name'
  return (
    <div
      className={`hover:bg-white hover:shadow-lg product hover:rounded-lg product ${productClassName}  p-2`}
    >
      <Link passHref href={`/product/${hit.slug}?queryID=${hit.__queryID}`}>
        <a
          className="flex px-6 py-3 items-center border rounded-xl"
          title={hit.name}
        >
          <div className="image-wrapper">
            <Image
              src={productImage}
              alt={hit.name}
              height={imageSize.height}
              width={imageSize.width}
              blurDataURL={hit.images[0]}
            />
          </div>
          <div className="flex items-center text justify-around lg:w-3/4 w-full flex-col lg:flex-row">
            <div className="group-1 lg:w-3/5 w-full">
              <Link passHref href={productVendorLink}>
                <button
                  type="button"
                  aria-label="vendor"
                  className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0  mb-1 md:mb-0 md:h-5"
                >
                  {hit?.vendor}
                </button>
              </Link>
              <div className="product-n md:mb-8 mb-2">
                <h3 className={`text-xs md:text-md ${productTClassName}`}>
                  {hit.name}
                </h3>
              </div>
            </div>
            <div className="group-2 flex lg:w-2/5 w-full flex-col">
              <div className="price-group w-full flex flex-col md:flex-row items-start md:items-center justify-between px-0">
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
              <button
                type="button"
                aria-label="add to cart"
                className="bg-mountain-green mt-4 w-full justify-center h-8 text-white px-4 py-1 flex items-center mx-auto rounded-md"
                onClick={addToCartHandler}
              >
                <CartIcon />
                <p className="text-xs md:text-sm">Add to cart</p>
              </button>
            </div>
          </div>
        </a>
      </Link>

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
