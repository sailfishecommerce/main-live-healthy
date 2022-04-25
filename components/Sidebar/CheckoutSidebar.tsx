/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { Button } from '@/components/UIElement'
import CartWidget from '@/components/Widget/CartWidget'
import useCoupon from '@/hooks/useCoupon'
import type { cartType } from '@/types'

interface CheckoutSidebarProps {
  cart: cartType | null
}

function OrderSummaryItem({ item }: any) {
  return (
    <div className="flex items-center py-2 border-b">
      <Link passHref href={`/products/${item.product.slug}`}>
        <a aria-label={item.product.name} className="d-block flex-shrink-0">
          <img
            src={item.product.images[0].file.url}
            alt={item.product.name}
            width="64"
          />
        </a>
      </Link>
      <div className="ps-2">
        <h6 className="widget-product-title">
          <Link passHref href={`/products/${item.product.slug}`}>
            <a aria-label={item.product.name}>{item.product.name}</a>
          </Link>
        </h6>
        <div className="widget-product-meta flex align-items-baseline">
          <span className="text-accent mx-2">
            <FormattedPrice price={item.price} />
          </span>
          <span className="text-gray-500">x {item.quantity}</span>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSidebar({ cart }: CheckoutSidebarProps) {
  const { loading, couponInputHandler, onSubmitCoupon } = useCoupon()

  return (
    <aside className="w-1/3 -mt-24 pt-4 laptop:pt-0 xl:px-5">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="py-2 xl:px-2">
          <div className="widget mb-3">
            <h2 className="text-xl font-bold text-center">Order summary</h2>
            <div className="products-list flex flex-col">
              {cart &&
                cart.items.map((item: any) => (
                  <CartWidget
                    className="w-52"
                    key={item.productId}
                    cart={item}
                  />
                ))}
            </div>
          </div>
          {cart && (
            <ul className="list-unstyled fs-sm pb-2 border-b">
              <li className="flex justify-between items-center">
                <span className="mx-2">Subtotal:</span>
                <span className="text-end">
                  <FormattedPrice price={cart.subTotal} />
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="mx-2">Shipping:</span>
                <span className="text-end">
                  <FormattedPrice price={cart.shipmentTotal} />
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="mx-2">Taxes:</span>
                <span className="text-end">
                  <FormattedPrice price={cart.taxTotal} />
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="mx-2">Discount:</span>
                <span className="text-end">
                  <FormattedPrice price={cart.discountTotal} />
                </span>
              </li>
            </ul>
          )}
          {cart && (
            <div className="total text-md font-bold text-xl flex items-center my-4 justify-between">
              <h3>Total</h3>
              <h3>
                <FormattedPrice price={cart.grandTotal} />
              </h3>
            </div>
          )}
          <form className="needs-validation" onSubmit={onSubmitCoupon}>
            <div className="mb-3">
              <input
                required
                className="border rounded w-full border-gray-200 px-2 rounded-md h-10 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
                type="text"
                placeholder="Promo code"
                onChange={couponInputHandler}
              />
              {/* <div className="text-red-500">Please provide promo code.</div> */}
            </div>
            <Button
              className="border w-1/2 border-red-500 hover:bg-red-500 hover:text-white p-2 flex mx-auto rounded-lg"
              loading={loading}
              disable={loading}
              text="Apply promo code"
              type="submit"
            />
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .products-list {
            overflow: auto;
            max-height: 470px;
          }
        `}
      </style>
    </aside>
  )
}
