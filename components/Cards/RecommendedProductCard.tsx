/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useAlgoliaEvent from '@/hooks/useAlgoliaEvent'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { ProductProps } from '@/typings/types'

interface ProductTypes extends ProductProps {
  className?: string
  smallerImage?: boolean
  imageClassName?: string
}

export default function RecommendedProductCard({
  product,
  className,
  smallerImage,
  imageClassName,
}: ProductTypes) {
  const { addItemToCart } = useShoppingCart()
  const { algoliaEvent } = useAlgoliaEvent()

  // loadingState(addItemToCart, `${product.name} added to cart`)

  const addToCartHandler = () => {
    algoliaEvent(
      'convertedObjectIDs',
      'Product added to Cart',
      product.objectID
    )
    addItemToCart.mutate({ product, quantity: 1 })
  }

  const productClassName = className ? className : ''
  const productImageClassName = imageClassName ? imageClassName : ''
  const imageSize = smallerImage
    ? {
        height: 100,
        width: 100,
      }
    : {
        height: 150,
        width: 150,
      }

  const productImage =
    typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0].file.url

  function algoliaEventHandler() {
    algoliaEvent('clickedObjectIDs', 'Product Clicked', product.objectID)
    algoliaEvent('viewedObjectIDs', 'Product Viewed', product.objectID)
  }

  return (
    <div
      className={`hov hover:shadow-lg mr-4 flex bg-gray-100 rounded-md flex-col hover:rounded-lg product ${productClassName}  p-4 hover:border`}
      title={product.name}
    >
      <div className={`${productImageClassName} mx-auto image-wrapper`}>
        <Link passHref href={`/product/${product.slug}`}>
          <a onClick={algoliaEventHandler}>
            <Image
              src={productImage}
              alt={product.name}
              height={imageSize.height}
              width={imageSize.width}
              className="rounded-xl"
              blurDataURL={productImage}
            />
          </a>
        </Link>
      </div>
      <div className="text">
        <div className="product-name-view my-2">
          <h3 className="text-xs product-name">{product.name}</h3>
        </div>
        <div className="price-view my-2 flex items-center justify-between">
          <FormattedPrice
            className="text-black font-bold text-sm"
            price={product.sale_price}
          />
          <button
            type="button"
            aria-label="add to cart"
            className="bg-mountain-green w-1/4 justify-center text-white px-2 py-1 flex items-center rounded-md"
            onClick={addToCartHandler}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
