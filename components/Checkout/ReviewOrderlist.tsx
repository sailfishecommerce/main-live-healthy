/* eslint-disable jsx-a11y/no-onchange */
import Image from 'next/image'
import { memo } from 'react'
import { FaTimes } from 'react-icons/fa'
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
    <div className="relative my-2 flex items-center hover:bg-gray-100 border border-b border-gray-100 justify-between p-4">
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
          <span className="px-4 font-semibold rounded-full h-6 flex items-center text-sm py-1 border">
            {content.quantity} {content.quantity > 1 ? 'items' : 'item'}
          </span>
          <FaTimes size={15} className="mx-2 text-gray-400" />
          <FormattedPrice
            className="font-medium text-sm"
            price={content.price}
          />
        </div>
      </div>
      <button type="button" onClick={removeItemFromCart}>
        <GiCancel
          size={32}
          aria-label="close"
          className="text-red-400 absolute top-0 right-0 font-bold h-6 w-6 lg:text-2xl text-xl  block outline-none focus:outline-none"
        />
      </button>
    </div>
  )
}

const ReviewOrderlist = memo(ReviewOrderlistComponent)
export default ReviewOrderlist
