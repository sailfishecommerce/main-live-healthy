import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import type { ProductProps } from '@/types'

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
  return (
    <Link passHref href={`/product/${product.slug}`}>
      <a
        className={`hov hover:shadow-lg mr-4 flex bg-gray-100 rounded-md flex-col hover:rounded-lg product ${productClassName}  p-4 hover:border`}
        title={product.name}
      >
        <div className={`${productImageClassName} mx-auto image-wrapper`}>
          <Image
            src={product.images[0].file.url}
            alt={product.name}
            height={imageSize.height}
            width={imageSize.width}
            className="rounded-xl"
            blurDataURL={product.images[0].file.url}
          />
        </div>
        <div className="text">
          <div className="product-name-view my-2">
            <h3 className="text-xs text-overflow">{product.name}</h3>
          </div>
          <div className="price-view my-2 flex items-center justify-between">
            <FormattedPrice
              className="text-black font-bold text-sm"
              price={product.price}
            />
            <button
              type="button"
              className="bg-mountain-green w-1/4 justify-center text-white px-2 py-1 flex items-center rounded-md"
            >
              <CartIcon />
            </button>
          </div>
        </div>
      </a>
    </Link>
  )
}
