import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { ProductProps } from '@/types'

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

export default function ProductBannerCard({ product, color }: ProductTypes) {
  const { addItemToCart } = useShoppingCart()

  // loadingState(addItemToCart, `${product.name} added to cart`)

  const addToCartHandler = () => addItemToCart.mutate({ product, quantity: 1 })

  return (
    <div className="hover:bg-white flex ml-4 p-2  hover:shadow-lg product hover:rounded-lg product hover:border">
      <Link
        passHref
        href={`/product/${product.slug}?queryID=${product.__queryID}`}
      >
        <a title={product.name} className="w-2/5 image-wrapper">
          <Image
            src={product.images[0].file.url}
            alt={product.name}
            height={250}
            width={250}
            blurDataURL={product.images[0].file.url}
            layout="responsive"
          />
        </a>
      </Link>
      <div className="w-3/5 text">
        <h4 className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 mb-1 md:mb-0 md:h-5">
          {product.vendor}
        </h4>
        <div className="product-name-view md:mb-6 mb-2">
          <h3 className="text-xs md:text-md product-name">{product.name}</h3>
        </div>
        <DynamicFormattedPrice
          price={product.price}
          className="text-sm md:text-md text-black font-semibold"
        />
        <button
          type="button"
          className="bg-mountain-green mt-4 w-full md:w-4/5 justify-center h-8 text-white px-4 py-1 flex items-center mx-auto rounded-md"
          onClick={addToCartHandler}
        >
          <CartIcon />
          <p className="text-xs md:text-sm">Add to cart</p>
        </button>
      </div>
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
