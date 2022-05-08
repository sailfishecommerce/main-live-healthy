/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { MdCancel } from 'react-icons/md'

import { CartControl } from '@/components/Cart/CartElements'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { cartType } from '@/types'

interface SlideCartProductProps {
  item: cartType
}

export default function SlideCartProduct({
  item,
}: SlideCartProductProps): JSX.Element {
  const { removeCartItem } = useShoppingCart()

  // loadingState(removeCartItem, `${item.product.name} removed from cart`)

  function removeItemFromCart() {
    removeCartItem.mutate(item)
  }

  return (
    <div className="slide-cart border-b p-2 relative">
      <div className="widget-cart-item py-1 relative">
        <button
          className="text-red-500 absolute top-6 right-2"
          type="button"
          aria-label="remove"
          onClick={removeItemFromCart}
        >
          <MdCancel size={32} />
        </button>
        <div className="flex items-center">
          <Link passHref href={`/products/${item.product.slug}`}>
            <a aria-label={item.product?.name} className="flex-shrink-0">
              <img
                src={item.product?.images[0]}
                alt={item.product?.name}
                width="64"
              />
            </a>
          </Link>
          <div className="px-2">
            <div className="name-group flex flex-col">
              <h5 className="widget-product-title">
                <Link passHref href={`/products/${item.product.slug}`}>
                  <a
                    aria-label={item.product.name}
                    className="text-sm md:text-md font-bold"
                  >
                    {item.product.name}
                  </a>
                </Link>
              </h5>
              {item.product?.attributes?.box && (
                <p>
                  {item.quantity} carton = {Number(item.quantity) * 10} boxes
                </p>
              )}
            </div>
            <div className="flex items-center my-2">
              <div className="widget-product-meta flex items-center">
                <span className="text-accent mx-2">
                  <FormattedPrice price={item.price} />
                </span>
                <span className="text-gray-800">x {item.quantity}</span>
                <span className="mx-1">= </span>
                <span className="text-accent mx-2">
                  <FormattedPrice price={item.priceTotal} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cartItem flex items-center justify-between">
        <CartControl item={item} />
        {item.options &&
          item.options.map((itemP: any, index: number) => (
            <p
              key={`item.name-${index}`}
              className="small text-gray-500 mx-2 mb-0 border px-2 rounded"
            >
              {itemP.name} | {itemP.value}{' '}
            </p>
          ))}
      </div>
      <style jsx>
        {`
          .slidecart {
            z-index: 200;
            display: flex;
            position: fixed;
            right: 0;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }
          .cart {
            width: 25%;
            right: 0;
            position: fixed;
            height: 100vh;
            overflow-y: scroll;
          }
          .closeButton {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 0px;
            z-index: 100;
            height: 30px;
            width: 30px;
            color: black;
            border-radius: 50%;
          }
          .closeButton:hover {
            background-color: black;
            color: white;
          }
          .closeButton:hover i {
            color: white;
          }
          .closeButton i {
            font-size: 20px;
          }
          .checkoutbtn {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            width: 100%;
            font-weight: bold;
            background-color: #42d697;
            font-size: 16px;
            margin: auto;
          }
          .checkoutbtn:hover {
            background-color: white;
            color: green;
            border: 1px solid #42d697;
          }
          .cartItem p:hover {
            color: white !important;
            background-color: #fb696a;
          }

          @media (max-width: 768px) {
            .cartItem input {
              font-size: 12px;
            }

            .name-group p {
              margin-bottom: 0px;
              font-size: 13px;
            }
            .cartItem label {
              font-size: 12px !important;
            }
            .cartItem p.small {
              font-size: 10px;
            }
          }
        `}
      </style>
    </div>
  )
}
