import AirwallexInvoiceList from '@/components/Invoice/AirwallexInvoiceList'
import InvoiceFooter from '@/components/Invoice/InvoiceFooter'
import Logo from '@/components/Logo'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'

const style = { width: '100%' }

export default function AirwallexInvoicePage({ invoice }: any) {
  const paymentMethod = `Airwallex ${invoice?.latest_payment_attempt?.id.toUpperCase()}`
  const customerName = `${invoice?.order?.shipping?.first_name} ${invoice.order.shipping.last_name}`
  return (
    <>
      <div
        style={style}
        className="invoice-receipt my-12 bg-white p-6 rounded-xl"
      >
        <div className="row flex justify-between mb-16 items-center">
          <Logo className="w-1/6" />
          <div className="invoice-date flex flex-col">
            <h1 className="text-2xl font-bold">{invoice?.id.toUpperCase()}</h1>
            <h5 className="font-thin text-lg">
              {formatOrderDate(invoice?.created_at)}
            </h5>
          </div>
        </div>
        <div className="row details grid grid-cols-3">
          <div className="shipping-address">
            <h1 className="font-semibold text-lg my-2">SHIPPING ADDRESS</h1>
            <p className="font-thin">
              {`${invoice.order.shipping.address.postcode} , ${invoice.order.shipping.address.street}`}
            </p>
            <p className="font-thin">
              {`${invoice.order.shipping.address.city} ${invoice.order.shipping.address.state}`}
            </p>
            <p className="font-thin">
              {getCountry(invoice.order.shipping.address.country_code)}
            </p>
          </div>
          <div className="customer">
            <h1 className="font-semibold text-lg my-2">CUSTOMER</h1>
            <p className="font-thin">{customerName}</p>
            <p className="font-thin">{invoice.order.shipping.phone_number}</p>
            <p className="font-thin">{invoice.order.shipping.address.street}</p>
            <p className="font-thin">{`${invoice.order.shipping.address.postcode} ${invoice.order.shipping.address.city}`}</p>
            <p className="font-thin">
              {` ${invoice.order.shipping.address.state} ${getCountry(
                invoice.order.shipping.address.country_code
              )}`}
            </p>
          </div>
          <div className="group">
            <div className="payment-method">
              <h1 className="font-semibold text-lg my-2">PAYMENT METHOD</h1>
              <p className="font-thin">{paymentMethod}</p>
            </div>
            <div className="shipping-method">
              <h1 className="font-semibold text-lg my-2">SHIPPING METHOD</h1>
              {/* <p className="font-thin">{shippingMethod[0]?.name}</p> */}
              <p className="font-thin">COVID-19 might cause delays</p>
            </div>
          </div>
        </div>
        <div className="row items mt-6">
          <table>
            <thead>
              <tr className="border-b">
                <th>ITEMS</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>ITEM TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice.order.products.map((product: any) => (
                <AirwallexInvoiceList
                  key={product.sku}
                  product={product}
                  currency={invoice.currency}
                />
              ))}
              <tr className="subtotal">
                <td></td>
                <td></td>
                <td className="text-center">
                  <p className="font-thin text-md">Subtotal</p>
                </td>
                <td className="text-center">
                  <FormattedPrice
                    currency={invoice.currency}
                    price={invoice.amount}
                    className="text-md font-thin"
                  />
                </td>
              </tr>{' '}
              <tr className="shipping">
                <td></td>
                <td></td>
                <td className="text-center">
                  <p className="font-thin text-md">Shipping</p>
                </td>
                <td className="text-center">
                  <FormattedPrice
                    currency={invoice.currency}
                    price={0}
                    className="text-md font-thin"
                  />
                </td>
              </tr>
              <tr className="total">
                <td></td>
                <td></td>
                <td className="text-center">
                  <p className="font-bold text-lg">
                    TOTAL ({invoice.currency})
                  </p>
                </td>
                <td className="text-center">
                  <FormattedPrice
                    currency={invoice.currency}
                    price={invoice.amount}
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
