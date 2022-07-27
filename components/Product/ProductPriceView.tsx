import { useRouter } from 'next/router'

import CartIcon from '@/components/Icons/CartIcon'
import CheckIcon from '@/components/Icons/CheckIcon'
import DeliveryboxIcon from '@/components/Icons/DeliveryboxIcon'
import LockIcon from '@/components/Icons/LockIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { useCart } from '@/hooks'
import useAlgoliaEvent from '@/hooks/useAlgoliaEvent'
import useShoppingCart from '@/hooks/useShoppingCart'
import useSlidingTab from '@/hooks/useSlidingTab'
import currentDate from '@/lib/incrementDate'
import type { productType } from '@/typings'

interface Props {
  product: productType
  queryObject: {
    queryID: string
    position: number
  } | null
}

export default function ProductPriceView({ product, queryObject }: Props) {
  const { addItemToCart } = useShoppingCart()
  const { updateSlideTab } = useSlidingTab()
  const router = useRouter()
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const { algoliaEvent } = useAlgoliaEvent()

  const listingDate: any = currentDate

  function algoliaEventHandler() {
    algoliaEvent(
      'clickedObjectIDs',
      'Buy now Clicked',
      product.objectID,
      queryObject?.queryID,
      queryObject?.position
    )
  }

  function buyNowHandler() {
    algoliaEventHandler()
    addItemToCart.mutate(
      { product, quantity: 1 },
      {
        onSuccess: () => {
          router.push(`/checkout/${cart?.checkoutId}`)
        },
      }
    )
  }

  function addToCartHandler() {
    algoliaEvent(
      'convertedObjectIDsAfterSearch',
      'Product added to cart after search',
      product.objectID,
      queryObject?.queryID,
      queryObject?.position
    )
    updateSlideTab('SLIDING-CART')
    addItemToCart.mutate({ product, quantity: 1 })
  }
  return (
    <div className="border border-gray-300 my-4 lg:my-6 rounded-3xl p-6 lg:p-8 flex flex-col">
      <div className="price flex flex-col">
        <FormattedPrice
          price={product.sale_price}
          className="font-semibold text-black text-xl lg:text-2xl"
        />
        <div className="buy-now-section flex flex-col">
          <div className="row-1 lg:mb-4 flex flex-col items-start justify-between my-3">
            <div className="row-group w-full flex items-center justify-between">
              <div className="button-group my-2 lg:mb-6 flex lg:w-3/5 justify-between w-full items-center my-2">
                <button
                  type="button"
                  className="bg-mountain-mist px-2 xl:text-lg lg:text-base rounded-lg mr-4 xl:w-1/2 flex items-center justify-center text-white py-1 lg:py-2 lg:px-1  xl:px-4"
                  onClick={addToCartHandler}
                >
                  <CartIcon />
                  Add to cart
                </button>
                <button
                  type="button"
                  aria-label="buy now"
                  className="bg-tan-hide xl:text-lg lg:text-base rounded-lg bg-tan-hide text-white py-2 lg:py-2 px-4"
                  onClick={buyNowHandler}
                >
                  Buy now
                </button>
              </div>
              <div className="lg:rounded-full hidden md:flex lg:border w-1/2 lg:w-1/4 px-2 lg:py-3 flex items-center justify-center px-1 my-2">
                <CheckIcon />
                <p className="font-normal text-sm text-xs ml-1">
                  Many in stock
                </p>
              </div>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="lg:hidden lg:rounded-full lg:border lg:w-1/3 flex items-center justify-center px-1 my-2 py-1">
                <CheckIcon />
                <p className="font-normal text-sm ml-1">Many in stock</p>
              </div>
              <div className="secure-transaction flex items-center">
                <LockIcon />
                <p className="font-normal text-xs md:text-sm ml-1 text-gray-400">
                  Secure transaction
                </p>
              </div>
            </div>
          </div>
          <div className="imported border-t border-gray-300 pt-6 flex flex-col md:flex-row md:items-center justify-between">
            <div className="from-ausralia flex items-center">
              <DeliveryboxIcon />
              <p className="ml-2 lg:text-lg text-xs">Imported from Australia</p>
            </div>
            <p className="text-gray-400 lg:text-lg text-sm my-2 md:my-0">
              Buy now to receive by {listingDate.addDays(5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
