import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import type { ProductProps } from '@/types'
import useShoppingCart from '@/hooks/useShoppingCart'

const DynamicFormattedPrice = dynamic(
  () =>
    import(
      /* webpackChunkName: 'FormattedPrice' */ '@/components/Price/FormattedPrice'
    ),
  {
    ssr: false,
  }
)

interface ProductTypes extends ProductProps {
  row?: boolean
  className?: string
  color?: string
  smallerImage?: boolean
  imageClassName?: string
}

export default function Product({
  product,
  className,
  row,
  color,
  smallerImage,
  imageClassName,
}: ProductTypes) {
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

  const { loadingState, addItemToCart } = useShoppingCart()

  loadingState(addItemToCart, `${product.name} added to cart`)

  const addToCartHandler = () => addItemToCart.mutate({ product, quantity: 1 })

  return (
    <div
      className={`hover:bg-white hover:shadow-lg product hover:rounded-lg product ${productClassName}  ${isRow} p-2 md:p-6 hover:border`}
    >
      <Link
        passHref
        href={`/product/${product.slug}?queryID=${product.__queryID}`}
      >
        <a title={product.name}>
          <div
            className={`${productImageClassName} ${imageWidth}  image-wrapper`}
          >
            <Image
              src={product.images[0].file.url}
              alt={product.name}
              height={imageSize.height}
              width={imageSize.width}
              blurDataURL={product.images[0].file.url}
            />
          </div>
          <div className={`${isRowText} ${imageWidth} text`}>
            <h4 className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 h-3 mb-1 md:mb-0 md:h-5">
              {product.vendor}
            </h4>
            <div className="product-name-view text-overflow md:mb-8 mb-2">
              <h3 className="text-xs md:text-md">{product.name}</h3>
            </div>
            <DynamicFormattedPrice
              price={product.price}
              className="text-sm md:text-md text-black font-semibold"
            />
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
