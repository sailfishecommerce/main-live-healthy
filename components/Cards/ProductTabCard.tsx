import memoize from 'memoize-one'
import Image from 'next/image'
import Link from 'next/link'

import FormattedPrice from '@/components/Price/FormattedPrice'
import useShoppingCart from '@/hooks/useShoppingCart'

const memoiseComponent = memoize((comp: any) => comp)

function ProductTabCardComponent({ product }: any) {
  const { addItemToCart } = useShoppingCart()

  const addToCartHandler = () => addItemToCart.mutate({ product, quantity: 1 })
  const productImage =
    typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0].file.url
  return (
    <>
      <div
        title={`Buy ${product.name}`}
        className="producttab-card flex p-2 md:p-4 justify-between items-center rounded-xl bg-light-gray mr-8"
      >
        <div className="image-wrapper block relative w-1/2 md:w-1/3">
          <Image
            src={productImage}
            alt={product.name}
            height={100}
            width={100}
            className="bg-white flex rounded-lg"
            blurDataURL={product.images[0]}
            layout="responsive"
          />
          <button
            type="button"
            aria-label="add to cart"
            className="bg-mountain-green add-to-cart-btn text-xs xl:text-sm bg-mountain-green mx-auto absolute py-1 px-2 rounded-md text-white"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
        <Link passHref href={`/product/${product.slug}`}>
          <a className="content flex flex-col ml-3 w-2/3 md:w-3/5">
            <h3 className="text-xs md:text-md lg:text-base product-name mb-3">
              {product.name}
            </h3>
            <div className="price-view xl:flex-row flex-col flex xl:items-center justify-between">
              <FormattedPrice
                className="font-bold text-xs md:text-sm text-black"
                price={product.sale_price}
              />
              {product.price !== 0 && (
                <FormattedPrice
                  price={product.price}
                  className="text-xs md:text-sm my-1 md:my-0 strike-through lg:text-md text-red-500 font-semibold"
                />
              )}
            </div>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .content {
            font-family: 'Commissioner', sans-serif;
            font-display: swap;
          }
          .producttab-card:hover {
            background-color: var(--color-4);
          }
          .add-to-cart {
            display: none;
          }

          .add-to-cart:hover {
            background-color: var(--color-2);
          }
          .add-to-cart-btn {
            top: 40%;
            left: 7%;
          }
          .producttab-card:hover .add-to-cart {
            display: flex;
          }
          .image-wrapper {
            margin: auto;
            align-items: center;
            position: relative;
            height: 100px;
            width: 100px;
            justify-content: center;
            position: relative;
          }
        `}
      </style>
    </>
  )
}

const ProductTabCard = memoiseComponent(ProductTabCardComponent)
export default ProductTabCard
