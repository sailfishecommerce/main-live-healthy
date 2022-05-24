import { createRef } from 'react'
import { BiDownload } from 'react-icons/bi'
import Pdf from 'react-to-pdf'

import InvoiceFooter from '@/components/Invoice/InvoiceFooter'
import InvoiceList from '@/components/Invoice/InvoiceList'
import Logo from '@/components/Logo'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'

function getShippingMethod(invoice: any) {
  const selectedShippingMethod = invoice?.shipment_rating.services.filter(
    (shippingData: any) => shippingData?.price === invoice?.shipment_price
  )
  return selectedShippingMethod
}

const style = { width: '100%', height: '100%' }

export default function Invoice({ invoice }: any) {
  const paymentMethod = invoice?.billing.intent?.stripe.id
    ? `Stripe ${invoice?.billing?.intent?.stripe.id.toUpperCase()}`
    : ''
  const shippingMethod = getShippingMethod(invoice)
  const ref: any = createRef()

  return (
    <>
      <Pdf targetRef={ref} filename={`invoice-${invoice.number}`}>
        {({ toPdf }: any) => (
          <button
            type="button"
            className="flex  mt-4 items-center bg-mountain-green text-white py-1 p-2 rounded-md"
            onClick={toPdf}
          >
            <BiDownload className="mr-2" size={24} /> Download
          </button>
        )}
      </Pdf>
      <div
        style={style}
        ref={ref}
        className="invoice-receipt mt-12 bg-white p-6 rounded-xl"
      >
        <div className="row flex justify-between mb-16 items-center">
          <Logo className="w-1/2" />
          <div className="invoice-date flex flex-col">
            <h1 className="text-2xl font-bold">{invoice?.number}</h1>
            <h5 className="font-thin text-lg">
              {formatOrderDate(invoice?.date_created)}
            </h5>
          </div>
        </div>
        <div className="row details grid grid-cols-3">
          <div className="shipping-address">
            <h1 className="font-semibold text-lg my-2">SHIPPING ADDRESS</h1>
            <p className="font-thin">
              {invoice?.shipping.address1},{invoice?.shipping.address2}
            </p>
            <p className="font-thin">
              {invoice?.shipping.zip} {invoice?.shipping.city}{' '}
              {invoice?.shipping.state}
            </p>
            <p className="font-thin">{getCountry(invoice?.shipping.country)}</p>
          </div>
          <div className="customer">
            <h1 className="font-semibold text-lg my-2">CUSTOMER</h1>
            <p className="font-thin">{invoice.billing.name}</p>
            <p className="font-thin">{invoice.billing.address1}</p>
            <p className="font-thin">{invoice.billing.address2}</p>
            <p className="font-thin">{`${invoice.billing.zip} ${invoice.billing.city}`}</p>
            <p className="font-thin">
              {invoice.billing.city} {getCountry(invoice.billing.country)}
            </p>
          </div>
          <div className="group">
            <div className="payment-method">
              <h1 className="font-semibold text-lg my-2">PAYMENT METHOD</h1>
              <p className="font-thin">{paymentMethod}</p>
            </div>
            <div className="shipping-method">
              <h1 className="font-semibold text-lg my-2">SHIPPING METHOD</h1>
              <p className="font-thin">{shippingMethod[0]?.name}</p>
              <p className="font-thin">COVID-19 might cause delays</p>
            </div>
          </div>
        </div>
        <div className="row items mt-6">
          <table>
            <thead>
              <tr>
                <th>ITEMS</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>ITEM TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item: any) => (
                <InvoiceList
                  key={item.id}
                  productName={item.product_name}
                  price={item.price}
                  quantity={item.quantity}
                  price_total={item.price_total}
                  currency={invoice.currency}
                />
              ))}
              <tr className="subtotal">
                <td></td>
                <td></td>
                <td>
                  <p className="font-thin text-md">Subtotal</p>
                </td>
                <td>
                  <FormattedPrice
                    currency={invoice.currency}
                    price={invoice.sub_total}
                    className="text-md font-thin"
                  />
                </td>
              </tr>{' '}
              <tr className="shipping">
                <td></td>
                <td></td>
                <td>
                  <p className="font-thin text-md">Shipping</p>
                </td>
                <td>
                  <FormattedPrice
                    currency={invoice.currency}
                    price={invoice.shipment_total}
                    className="text-md font-thin"
                  />
                </td>
              </tr>
              <tr className="total">
                <td></td>
                <td></td>
                <td>
                  <p className="font-bold text-lg">
                    TOTAL ({invoice.currency})
                  </p>
                </td>
                <td>
                  <FormattedPrice
                    currency={invoice.currency}
                    price={invoice.grand_total}
                    className="text-lg font-bold"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <InvoiceFooter />
      </div>
      <style jsx>
        {`
          .row.items table {
            width: 100%;
          }
          .row.items tr {
            height: 60px;
          }
          .row.items tr.last {
            border-bottom: 1px solid #e5e5e6;
          }
        `}
      </style>
    </>
  )
}
