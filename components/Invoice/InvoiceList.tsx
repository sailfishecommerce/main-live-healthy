/* eslint-disable no-nested-ternary */
import Image from 'next/image'
import { useQuery } from 'react-query'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'

function InvoiceListItem({ productId, currency, quantity }: any) {
  const { getAProduct } = useProduct()
  const { data, status } = useQuery(`productDetails-${productId}`, () =>
    getAProduct(productId)
  )

  const productImage =
    typeof data?.images[0] === 'string'
      ? data?.images[0]
      : data?.images[0].file.url

  const productPrice = currency === 'HKD' ? data?.price : data?.origPrice

  return (
    <>
      {status === 'error' ? (
        'unable to load item'
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : (
        <tr className="view">
          <td>
            <div className="product-view flex items-center">
              <Image
                src={productImage}
                alt={data?.name}
                height={80}
                width={80}
              />

              <div className="content flex flex-col ml-2">
                <h1 className="font-thin text-lg">{data?.name}</h1>
                <p className="font-thin text-md">SKU {data?.sku}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="price flex flex-col">
              {data.price === data?.price && (
                <FormattedPrice
                  price={data?.origPrice}
                  className="text-md font-bold strike-through"
                  currency={currency}
                />
              )}
              <FormattedPrice
                currency={currency}
                price={productPrice}
                className="text-md font-thin"
              />
            </div>
          </td>
          <td>
            <p className="font-thin text-md quantity">{quantity}</p>
          </td>
          <td>
            <FormattedPrice
              className="text-md font-thin"
              price={data.price}
              currency={currency}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export default function InvoiceList({
  quantity,
  price_total,
  currency,
  productId,
}: any) {
  return (
    <InvoiceListItem
      quantity={quantity}
      currency={currency}
      price_total={price_total}
      productId={productId}
    />
  )
}
