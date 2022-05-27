import Image from 'next/image'

import FormattedPrice from '@/components/Price/FormattedPrice'
import invoiceProducts from '@/json/invoice-product.json'

function InvoiceListItem({ productId, currency, quantity }: any) {
  const invoiceProduct: any = invoiceProducts.filter(
    (product) => product?.id === productId
  )[0]

  const productImage =
    typeof invoiceProduct?.images[0] === 'string'
      ? invoiceProduct?.images[0]
      : invoiceProduct?.images[0].file.url

  return (
    <>
      {invoiceProduct !== undefined ? (
        <tr className="view">
          <td className="w-1/2">
            {productImage !== undefined && (
              <div className="product-view flex items-center">
                {productImage !== undefined && (
                  <Image
                    src={productImage}
                    alt={invoiceProduct?.name}
                    height={150}
                    width={200}
                  />
                )}
                <div className="content flex flex-col ml-2">
                  <h1 className="font-thin  text-md">{invoiceProduct?.name}</h1>
                  <p className="font-thin text-md mt-2">
                    SKU {invoiceProduct?.sku}
                  </p>
                </div>
              </div>
            )}
          </td>
          <td className="w-1/6 text-center">
            {productImage !== undefined && (
              <div className="price flex flex-col">
                {invoiceProduct?.price && (
                  <FormattedPrice
                    price={invoiceProduct?.price}
                    className="text-md font-bold strike-through"
                    currency={currency}
                  />
                )}
                <FormattedPrice
                  currency={currency}
                  price={invoiceProduct.sale_price}
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
              price={invoiceProduct?.sale_price}
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
