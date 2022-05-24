import InvoiceList from '@/components/Invoice/InvoiceList'
import Logo from '@/components/Logo'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'

function getShippingMethod(invoice: any) {
  const selectedShippingMethod = invoice?.shipment_rating.services.filter(
    (shippingData: any) => shippingData?.price === invoice?.shipment_price
  )
  return selectedShippingMethod
}

export default function Invoice({ invoice }: any) {
  const paymentMethod = invoice?.billing.intent?.stripe.id
    ? `Stripe ${invoice?.billing?.intent?.stripe.id.toUpperCase()}`
    : ''
  const shippingMethod = getShippingMethod(invoice)

  return (
    <div className="invoice-receipt">
      <div className="row justify-between items-center">
        <Logo className="w-1/2" />
        <div className="invoice-date flex flex-col">
          <h1 className="text-3xl">{invoice.number}</h1>
          <h5 className="font-thin text-xl">
            {formatOrderDate(invoice.date_created)}
          </h5>
        </div>
      </div>
      <div className="row details grid grid-cols-3">
        <div className="shipping-address">
          <h1 className="font-bold text-xl my-2">SHIPPING ADDRESS</h1>
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
          <h1 className="font-bold text-xl my-2">CUSTOMER</h1>
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
            <h1 className="font-bold text-xl my-2">PAYMENT METHOD</h1>
            <p className="font-thin">{paymentMethod}</p>
          </div>
          <div className="shipping-method">
            <h1 className="font-bold text-xl my-2">SHIPPING METHOD</h1>
            <p className="font-thin">{shippingMethod[0]?.name}</p>
            <p className="font-thin">COVID-19 might cause delays</p>
          </div>
        </div>
      </div>
      <div className="row items">
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
