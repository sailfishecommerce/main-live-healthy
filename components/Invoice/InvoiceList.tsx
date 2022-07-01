import Image from 'next/image'
import { useCallback } from 'react'

import FormattedPrice from '@/components/Price/FormattedPrice'

export default function InvoiceList({ currency, product, item }: any) {
  const productImageCallback = useCallback(() => {
    return typeof product?.images[0] === 'string'
      ? product?.images[0]
      : product?.images[0].file.url
  }, [product.images])

  const productImage = productImageCallback()
  return (
    <>
      {product !== undefined || product !== null ? (
        <tr className="view">
          <td className="w-1/2">
            <div className="product-view flex items-center">
              <Image
                src={productImage}
                alt={product?.name}
                height={150}
                width={200}
              />
              <div className="content flex flex-col ml-2">
                <h1 className="font-thin  text-md">{product?.name}</h1>
                <p className="font-thin text-md mt-2">SKU {product?.sku}</p>
              </div>
            </div>
          </td>
          <td className="w-1/6 text-center">
            {productImage !== undefined && (
              <div className="price flex flex-col">
                {item?.orig_price > item?.price && (
                  <FormattedPrice
                    price={item?.orig_price}
                    className="text-md font-bold strike-through"
                    currency={currency}
                  />
                )}
                <FormattedPrice
                  currency={currency}
                  price={item.price}
                  className="text-md font-thin"
                />
              </div>
            )}
          </td>
          <td className="w-1/6 text-cventer">
            <p className="font-thin text-md quantity">{item.quantity}</p>
          </td>
          <td className="w-1/6 text-center">
            <FormattedPrice
              className="text-md font-thin"
              price={item?.price_total}
              currency={currency}
            />
          </td>
        </tr>
      ) : (
        <tr>
          <td>{null}</td>
        </tr>
      )}
    </>
  )
}
