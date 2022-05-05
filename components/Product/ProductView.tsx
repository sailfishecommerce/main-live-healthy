/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import {
  BsCartPlusFill,
  BsFacebook,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs'

import useShoppingCart from '@/hooks/useShoppingCart'
import productBox from '@/json/info-section.json'
import type { productType } from '@/types'

export function PaymentNote() {
  return (
    <div className="payment-partners flex flex-col mt-5">
      <img
        src="/payment-card.png"
        className="payment-card w-32 mx-auto"
        alt="we are accept visa, mastercard cards and bank transfers"
      />
      <div className="secured-by flex items-center mt-2">
        <AiFillLock />
        <p className="text-gray-500 mx-2 mb-0">
          Transactions secured by Stripe & Airwallex
        </p>
      </div>
      <div className="border w-100 p-3 mt-4 rounded">
        <p>
          We accept bank deposits through all major networks globally including
          ACH,Fedwire, SWIFT,IBAN and BSB.{' '}
        </p>
        <p className="mb-0">
          Orders are shipped after transfers are manually verified. Additional
          documentation might be requested{' '}
        </p>
      </div>
    </div>
  )
}

export function ProductBoxTable() {
  return (
    <div className="productAttribute">
      <table className="table table-bordered">
        <tbody>
          {productBox.productView.map((row, index) => (
            <tr key={`row-${index}`}>
              {row.map((data, index) => (
                <td key={`data-${index}`}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ProductOptionSelectType {
  option: any
  selectedItemHandler: (e: any) => void
}

export function ProductOptionSelect({
  option,
  selectedItemHandler,
}: ProductOptionSelectType) {
  return (
    <div className="mb-3">
      <label className="fw-medium pb-1" htmlFor="product-size">
        Size:
      </label>
      <select
        required
        name="Size"
        className="form-select"
        id="product-size"
        onChange={selectedItemHandler}
      >
        <option value="">Select size</option>
        {option.values.map((value: { id: string; name: string }) => (
          <option key={value.id} value={value.name}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  )
}

interface ProductOptionSelectBoxProps {
  productQtyHandler: (e: any) => void
  quantityArr: number[]
}

export function ProductOptionSelectBox({
  productQtyHandler,
  quantityArr,
}: ProductOptionSelectBoxProps) {
  return (
    <div className="flex flex-col w-50">
      <label htmlFor="selectProductQuantity font-bold">Cartons</label>
      <select
        required
        name="productQty"
        className="form-select"
        id="selectProductQuantity"
        onChange={productQtyHandler}
      >
        <option value="">Select Quantity</option>
        {quantityArr.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
interface ProductQuantityCounterType {
  product: productType
}
export function ProductQuantityCounter({
  product,
}: ProductQuantityCounterType) {
  const [itemQty, setItemQty] = useState(1)
  const { addItemToCartModal } = useShoppingCart()

  // loadingState(addItemToCartModal, `${product.name} updated`)

  function updateCounter(type: 'decrement' | 'increment') {
    if (type === 'increment') {
      setItemQty(itemQty + 1)
    } else if (type === 'decrement' && itemQty > 1) {
      setItemQty(itemQty - 1)
    }
  }

  function addToCart() {
    addItemToCartModal.mutate({
      product,
      productQty: itemQty,
      selectedOptions: [],
    })
  }

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="cartCounter w-1/2 lg:w-50 flex items-center mb-0">
        <button
          aria-label="Remove"
          type="button"
          className="h-8 text-xl font-bold flex items-center justify-center bg-red-500 hover:bg-red-400 text-white w-10 rounded-md"
          onClick={() => updateCounter('decrement')}
        >
          -
        </button>
        <input
          readOnly
          className="w-1/5 mx-2 text-center border focus-within:ring-1 focus-within:ring-red-500"
          value={itemQty}
        />
        <button
          aria-label="Add"
          type="button"
          className="h-8 text-xl font-bold flex items-center justify-center bg-green-500 text-white w-10 hover:bg-green-400 rounded-md"
          onClick={() => updateCounter('increment')}
        >
          +
        </button>
      </div>
      <button
        aria-label="Add to Cart"
        className="flex bg-red-500 items-center rounded-md text-white p-2 text-sm hover:bg-red-400"
        type="button"
        onClick={addToCart}
      >
        <BsCartPlusFill className="mx-1" />
        Add to Cart
      </button>
    </div>
  )
}

export function ShareProductLink() {
  return (
    <div className="flex items-center">
      <label className="mr-2">Share:</label>
      <a
        aria-label="visit us on twitter"
        className="flex items-center hover:text-blue-500"
        href="#"
      >
        <BsTwitter className="mx-1" /> Twitter
      </a>
      <a
        aria-label="visit us on instagram"
        className="flex items-center mx-2 hover:text-blue-500"
        href="#"
      >
        <BsInstagram className="mx-1" />
        Instagram
      </a>
      <a
        aria-label="visit us on facebook"
        className="flex items-center hover:text-blue-500"
        href="#"
      >
        <BsFacebook className="mx-1" />
        Facebook
      </a>
    </div>
  )
}
