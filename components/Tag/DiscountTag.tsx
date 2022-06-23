import React from 'react'

interface Props {
  price: number
  salePrice: number
}

export default function DiscountTag({ price, salePrice }: Props) {
  const discount = (price - salePrice) / price
  const roundedDiscount = Number(Math.round(discount * 100)) / 100
  const discountPercentage = Number(roundedDiscount.toFixed(2)) * 100

  return (
    <>
      {price !== 0 && (
        <div className="absolute text-xs flex rounded-bl-none items-center discount-tag bg-mountain-green rounded-b-xl rounded-r-xl text-white p-1 z-10 left-0 top-0 text-clip">
          <span> {discountPercentage} </span> % Off
        </div>
      )}
      <style jsx>
        {`
          .discount-tag span {
            width: 14px;
            overflow-x: clip !important;
          }
        `}
      </style>
    </>
  )
}
