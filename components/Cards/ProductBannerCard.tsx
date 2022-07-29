import Image from 'next/image'
import Link from 'next/link'

import CartIcon from '@/components/Icons/CartIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import DiscountTag from '@/components/Tag/DiscountTag'
import useShoppingCart from '@/hooks/useShoppingCart'

export default function ProductBannerCard({ product, color }: any) {
  const { addItemToCart } = useShoppingCart()

  const addToCartHandler = () => addItemToCart.mutate({ product, quantity: 1 })
  const productImage =
    typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0].file.url

  return (
    <Link
      passHref
      href={`/product/${product.slug}?queryID=${product.__queryID}`}
    >
      <a
        title={product.name}
        className="hover:bg-white flex ml-4 p-2 relative hover:shadow-lg product hover:rounded-lg product hover:border"
      >
        <DiscountTag price={product.price} salePrice={product.sale_price} />

        <span className="w-2/5 block image-wrapper">
          <Image
            src={productImage}
            alt={product.name}
            height={250}
            width={250}
            blurDataURL={productImage}
            loading="lazy"
          />
        </span>
        <div className="w-3/5 pl-2 text">
          <h4 className="vendor text-xs md:text-md font-bold pl-2 my-0 py-0 mb-1 md:mb-0 md:h-5">
            {product.vendor}
          </h4>
          <div className="product-name-view xl:mb-6 mb-2">
            <h3 className="text-xs md:text-md product-name">{product.name}</h3>
          </div>
          <div className="price-group md:flex-row flex-col items-start flex xl:items-center justify-between">
            <FormattedPrice
              price={product.sale_price}
              className="text-sm md:text-md text-black mb-1 xl:mb-0 font-semibold"
            />
            {product.price !== 0 && (
              <FormattedPrice
                price={product.price}
                className="text-sm strike-through md:text-sm text-red-500 font-semibold"
              />
            )}
          </div>
          <button
            type="button"
            className="bg-mountain-green mt-4 w-full w-3/4 xl:w-4/5 justify-center h-8 text-white xl:px-4 py-1 flex items-center mx-auto rounded-md"
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
      </a>
    </Link>
  )
}
