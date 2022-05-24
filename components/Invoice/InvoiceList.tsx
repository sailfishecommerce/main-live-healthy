import Image from 'next/image'
import { Configure, Index, connectHits } from 'react-instantsearch-dom'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { indexName } from '@/utils/env'

function InvoiceHitComponent({
  hits,
  quantity,
  price,
  price_total,
  currency,
}: any) {
  const invoiceHit = hits[0]
  const productImage =
    typeof invoiceHit?.images[0] === 'string'
      ? invoiceHit?.images[0]
      : invoiceHit?.images[0].file.url
  const productPrice = currency === 'HKD' ? invoiceHit?.sale_price : price
  return (
    <>
      <tr className="view">
        <td>
          <div className="product-view flex items-center">
            {invoiceHit && (
              <Image
                src={productImage}
                alt={invoiceHit?.name}
                height={80}
                width={80}
              />
            )}
            <div className="content flex flex-col ml-2">
              <h1 className="font-thin text-lg">{invoiceHit?.name}</h1>
              <p className="font-thin text-md">SKU {invoiceHit?.sku}</p>
            </div>
          </div>
        </td>
        <td>
          <div className="price flex flex-col">
            {price === invoiceHit?.price && (
              <FormattedPrice
                price={invoiceHit?.price}
                className="text-sm font-bold strike-through"
                currency={currency}
              />
            )}
            <FormattedPrice
              currency={currency}
              price={productPrice}
              className="text-sm font-bold"
            />
          </div>
        </td>
        <td>
          <p className="font-thin">{quantity}</p>
        </td>
        <td>
          <FormattedPrice
            className="text-sm font-bold"
            price={price_total}
            currency={currency}
          />
        </td>
      </tr>
      <style jsx>
        {`
          .view {
            border-bottom: 1px solid #e5e5e6;
            margin: 10px 0px;
            height: 120px;
          }
        `}
      </style>
    </>
  )
}
const InvoiceHit = connectHits<any, any>(InvoiceHitComponent)

function InvoiceListComponent({
  productName,
  price,
  quantity,
  price_total,
  currency,
  productId,
}: any) {
  const slug = productName
    ?.toLowerCase()
    .replaceAll('. ', '-')
    ?.replaceAll(' ', '-')
    .replaceAll('.', '-')
  return (
    <>
      <Index indexName={indexName} indexId={`${productName}-hit`}>
        <Configure filters={`slug:${slug}`} hitsPerPage={1} />
        <InvoiceHit
          quantity={quantity}
          price={price}
          currency={currency}
          price_total={price_total}
          productId={productId}
        />
      </Index>
    </>
  )
}

const InvoiceList = connectHits<any, any>(InvoiceListComponent)

export default InvoiceList
