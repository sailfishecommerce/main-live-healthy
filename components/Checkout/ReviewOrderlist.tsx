/* eslint-disable jsx-a11y/no-onchange */
import Image from 'next/image'
import { memo } from 'react'
import { FaEquals, FaTimes } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'

import FormattedPrice from '@/components/Price/FormattedPrice'
import useShoppingCart from '@/hooks/useShoppingCart'

const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function ReviewOrderlistComponent({ content }: any) {
  const { updateCartItem, removeCartItem } = useShoppingCart()

  const removeItemFromCart = () => removeCartItem.mutate(content)

  const productImage =
    typeof content.product.images[0] === 'string'
      ? content.product.images[0]
      : content.product.images[0].file.url

  return (
    <>
      <div className="relative my-2 flex items-center hover:bg-gray-100 border rounded-lg border-gray-300 justify-between p-4">
        <div className="image-wrapper w-1/4">
          <Image
            src={productImage}
            alt={content.product.name}
            height={70}
            width={100}
            className="rounded-lg"
            layout="responsive"
          />
        </div>
        <div className="text flex flex-col ml-2 w-3/4">
          <span className="product-name-view mb-4">
            <h4 className="font-medium my-1 product">{content.product.name}</h4>
          </span>
          <div className="quantity">
            <span className="font-medium">Qty: </span>{' '}
            <select
              className="w-12 border border-gray-100 p-1 mx-1 text-center font-bold"
              onChange={(e) =>
                updateCartItem.mutate({
                  product: content,
                  quantity: e.target.value,
                })
              }
            >
              {selectOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="price-view mt-2 flex items-center">
            <div></div>
            <span className="px-1 xl:px-4 item-quantity font-semibold rounded-full h-6 flex items-center text-xs py-1 border">
              {content.quantity} {content.quantity > 1 ? 'items' : 'item'}
            </span>
            <FaTimes size={15} className="mx-2 text-gray-400" />
            <FormattedPrice
              className="font-medium text-xs lg:text-sm"
              price={content.price}
            />
            <span className="ml-2 flex items-center text-xs">
              <FaEquals className="mr-2" />
              <FormattedPrice
                className="font-medium text-xs lg:text-sm"
                price={content.priceTotal}
              />
            </span>
          </div>
        </div>
        <button
          aria-label="continue shopping"
          type="button"
          onClick={removeItemFromCart}
        >
          <GiCancel
            size={32}
            aria-label="close"
            className="text-red-400 absolute top-1 right-1 font-bold h-6 w-6 lg:text-2xl text-xl  block outline-none focus:outline-none"
          />
        </button>
      </div>
      <style jsx>
        {`
          @media (max-width: 1440px) {
            .price-view .rounded-full {
              padding: 5px;
            }
            .price-view .rounded-full {
              padding: 5px;
            }
          }
          @media (max-width: 400px) {
            .item-quantity {
              font-size: 11px;
              padding: 0px;
              text-align: center;
            }
          }
          @media (max-width: 330px) {
            .price-view {
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </>
  )
}

const ReviewOrderlist = memo(ReviewOrderlistComponent)
export default ReviewOrderlist
