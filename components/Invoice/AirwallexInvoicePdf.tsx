/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, Image, View } from '@react-pdf/renderer'

import AirwallexInvoiceListPdf from '@/components/Invoice/AirwallexInvoiceListPdf'
import InvoicePdfFooter from '@/components/Invoice/InvoicePdfFooter'
import { styles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'

// import getShippingMethod from '@/lib/shippingMethod'

export default function AirwallexInvoicePdf({ invoice }: any) {
  // const shippingMethod = getShippingMethod(invoice)
  const paymentMethod = `Airwallex-${invoice?.latest_payment_attempt?.id.toUpperCase()}`
  const customerName = `${invoice?.order?.shipping?.first_name} ${invoice.order.shipping.last_name}`

  return (
    <Document>
      <Page wrap={true} size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1653526669/Logo_1_a7apg1.png"
            style={styles.image}
          />
          <View style={styles.toRight}>
            <Text style={styles.idNumber}>{invoice?.id.toUpperCase()}</Text>
            <Text style={styles.date}>
              {formatOrderDate(invoice?.created_at)}
            </Text>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.shippingView}>
            <Text style={styles.title}>SHIPPING ADDRESS</Text>
            <Text style={styles.text}>
              {`${invoice.order.shipping.address.postcode} , ${invoice.order.shipping.address.street}`}
            </Text>
            <Text style={styles.text}>
              {invoice.order.shipping.address.city}
              {invoice.order.shipping.address.state}
            </Text>
            <Text style={styles.text}>
              {getCountry(invoice.order.shipping.address.country_code)}
            </Text>
          </View>
          <View style={styles.customerView}>
            <Text style={styles.title}>CUSTOMER</Text>
            <Text style={styles.text}>{customerName}</Text>
            <Text style={styles.text}>
              {invoice.order.shipping.address.street}
            </Text>
            <Text
              style={styles.text}
            >{`${invoice.order.shipping.address.postcode} ${invoice.order.shipping.address.city}`}</Text>
            <Text style={styles.text}>
              {invoice.order.shipping.address.city}
            </Text>
            <Text style={styles.text}>
              {invoice.order.shipping.address.state}
              {getCountry(invoice.order.shipping.address.country_code)}
            </Text>
          </View>
          <View style={styles.paymentMethod}>
            <View style={styles.paymentView}>
              <Text style={styles.title}>PAYMENT METHOD</Text>
              <Text style={styles.text}>{paymentMethod}</Text>
            </View>
            <View>
              <Text style={styles.title}>SHIPPING METHOD</Text>
              <Text style={styles.text}>
                {/* <p className="font-thin">{shippingMethod[0]?.name}</p> */}
              </Text>
              <Text style={styles.text}>COVID-19 might cause delays</Text>
            </View>
          </View>
        </View>
        <View style={styles.row3}>
          <Text style={styles.itemsTitle}>ITEMS</Text>
          <Text style={styles.priceTitle}>PRICE</Text>
          <Text style={styles.quantity}>QTY</Text>
          <Text style={styles.rowTitle}>ITEM TOTAL</Text>
        </View>
        <View>
          {invoice.order.products.map((product: any) => (
            <AirwallexInvoiceListPdf
              key={product.sku}
              product={product}
              currency={invoice.currency}
            />
          ))}
        </View>
        <View style={styles.row4}>
          <View style={styles.innerRow}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.amount}
                className="text-md font-thin"
              />
            </Text>
          </View>
          <View style={styles.innerRow}>
            <Text style={styles.text}>Shipping</Text>
            <Text style={styles.text}>
              <FormattedPrice
                currency={invoice.currency}
                price={0}
                className="text-md font-thin"
              />
            </Text>
          </View>
          <View style={styles.innerRow}>
            <Text style={styles.title}>TOTAL ({invoice.currency})</Text>
            <Text style={styles.title}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.amount}
                className="text-lg font-bold"
              />
            </Text>
          </View>
          <View style={styles.totalEnd} />
        </View>
        <InvoicePdfFooter />
      </Page>
    </Document>
  )
}
