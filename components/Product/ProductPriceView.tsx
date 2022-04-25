import Image from 'next/image'

import CartIcon from '@/components/Icons/CartIcon'
import DeliveryboxIcon from '@/components/Icons/DeliveryboxIcon'
import LockIcon from '@/components/Icons/LockIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useAlgoliaEvents from '@/hooks/useAlgoliaEvents'
import useShoppingCart from '@/hooks/useShoppingCart'
import useSlidingTab from '@/hooks/useSlidingTab'

export default function ProductPriceView({ product }: any) {
  const { loadingState, addItemToCart } = useShoppingCart()
  const { productAddedToCart } = useAlgoliaEvents()
  const { updateSlideTab } = useSlidingTab()

  loadingState(addItemToCart, `${product.name} added to cart`)

  function addToCartHandler() {
    updateSlideTab('SLIDING-CART')
    addItemToCart.mutate({ product, quantity: 1 })
    productAddedToCart([product.id])
  }
  return (
    <div className="border border-gray-200 my-4 my-6 rounded-3xl p-6 flex flex-col">
      <div className="price flex flex-col">
        <FormattedPrice
          price={product.price}
          className="font-semibold text-black text-xl"
        />
        <div className="buy-now-section flex flex-col">
          <div className="row-1 flex flex-col md:flex-row items-start md:items-center justify-between my-3">
            <div className="button-group flex w-3/5 items-center my-2">
              <button
                type="button"
                className="add-to-cart rounded-lg mr-4 flex items-center bg-mountain-green text-white py-1 px-4"
                onClick={addToCartHandler}
              >
                <CartIcon />
                Add to cart
              </button>
              <button
                type="button"
                className="buy-now rounded-lg bg-tan-hide text-white py-1 px-4"
              >
                Buy now
              </button>
            </div>
            <div className="row flex items-center  w-1/5 justify-between">
              <div className="rounded-full border w-full  flex items-center justify-center px-1 my-2 py-1">
                <div className="w-1/5 flex items-center">
                  <Image
                    src="/check-icon-green.png"
                    alt="many in stock"
                    height={20}
                    width={20}
                  />
                </div>
                <p className="font-normal text-sm ml-1">Many in stock</p>
              </div>
              <div className="secure-transaction flex items-center md:hidden">
                <LockIcon />
                <p className="font-normal text-xs md:text-sm ml-1 text-gray-400">
                  Secure transaction
                </p>
              </div>
            </div>
          </div>
          <div className="md:lg secure-transaction border-b border-gray-200 pb-4 flex items-center">
            <LockIcon />
            <p className="font-normal text-sm ml-1 text-gray-400">
              Secure transaction
            </p>
          </div>
          <div className="imported pt-4 flex flex-col md:flex-row md:items-center justify-between">
            <div className="from-ausralia flex items-center">
              <DeliveryboxIcon />
              <p className="ml-2 text-xs">Imported from Australia</p>
            </div>
            <p className="text-gray-400 text-sm my-2 md:my-0">
              Buy now to receive by 31 April 2022
            </p>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .add-to-cart:hover {
            background-color: var(--mountain-mist);
          }
          .buy-now:hover {
            background-color: var(--tan-deep-hide);
          }
        `}
      </style>
    </div>
  )
}
