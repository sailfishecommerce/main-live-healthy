import Image from 'next/image'

import FormattedPrice from '@/components/Price/FormattedPrice'

export default function AirwallexInvoiceList({ currency, product }: any) {
  const itemTotal = product.quantity * product.unit_price
  return (
    <>
      <tr className="view">
        <td className="w-1/2">
          <div className="product-view flex items-center">
            <Image
              src={product.url}
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
          <div className="price flex flex-col">
            <FormattedPrice
              currency={currency}
              price={product.unit_price}
              className="text-md font-thin"
            />
          </div>
        </td>
        <td className="w-1/6 text-cventer">
          <p className="font-thin text-md quantity">{product.quantity}</p>
        </td>
        <td className="w-1/6 text-center">
          <FormattedPrice
            className="text-md font-thin"
            price={itemTotal}
            currency={currency}
          />
        </td>
      </tr>
    </>
  )
}
