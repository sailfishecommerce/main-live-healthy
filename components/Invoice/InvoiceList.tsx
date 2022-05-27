/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'
import { invoiceProductsAtom } from '@/lib/atomConfig'

function InvoiceListItem({ productId, currency, quantity }: any) {
  const { getAProduct } = useProduct()
  const [invoiceProduct, setInvoiceProduct] = useAtom(invoiceProductsAtom)
  const { data, status } = useQuery(`productDetails-${productId}`, () =>
    getAProduct(productId)
  )

  useEffect(() => {
    if (status === 'success') {
      setInvoiceProduct([...invoiceProduct, data])
    }
  }, [status])

  console.log('invoiceProduct', invoiceProduct)
  
  const productImage =
    typeof data?.images[0] === 'string'
      ? data?.images[0]
      : data?.images[0].file.url

  return (
    <>
      {status === 'error' ? (
        'unable to load item'
      ) : status === 'loading' ? (
        <tr>
          <td>
            <p>Loading...</p>
          </td>
        </tr>
      ) : (
        <tr className="view">
          <td className="w-1/2">
            {productImage !== undefined && (
              <div className="product-view flex items-center">
                {productImage !== undefined && (
                  <Image
                    src={productImage}
                    alt={data?.name}
                    height={80}
                    width={80}
                  />
                )}
                <div className="content flex flex-col ml-2">
                  <h1 className="font-thin text-lg">{data?.name}</h1>
                  <p className="font-thin text-md">SKU {data?.sku}</p>
                </div>
              </div>
            )}
          </td>
          <td className="w-1/6 text-center">
            {productImage !== undefined && (
              <div className="price flex flex-col">
                {data?.price && (
                  <FormattedPrice
                    price={data?.origPrice}
                    className="text-md font-bold strike-through"
                    currency={currency}
                  />
                )}
                <FormattedPrice
                  currency={currency}
                  price={data?.price}
                  className="text-md font-thin"
                />
              </div>
            )}
          </td>
          <td className="w-1/6 text-cventer">
            <p className="font-thin text-md quantity">{quantity}</p>
          </td>
          <td className="w-1/6 text-center">
            <FormattedPrice
              className="text-md font-thin"
              price={data?.price}
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
