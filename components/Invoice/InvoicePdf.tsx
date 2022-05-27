/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, Image, View, Link } from '@react-pdf/renderer'
import dynamic from 'next/dynamic'

import { styles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'
import getShippingMethod from '@/lib/shippingMethod'

const InvoiceListPdf = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InvoiceList' */ '@/components/Invoice/InvoiceListPdf'
    ),
  {
    ssr: false,
  }
)

export default function InvoicePdf({ invoice }: any) {
  const paymentMethod = invoice?.billing.intent?.stripe.id
    ? `Stripe ${invoice?.billing?.intent?.stripe.id.toUpperCase()}`
    : ''
  const shippingMethod = getShippingMethod(invoice)

  return (
    <Document>
      <Page wrap size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1653526669/Logo_1_a7apg1.png"
            style={styles.image}
          />
          <View style={styles.toRight}>
            <Text style={styles.orderNumber}>{invoice?.number}</Text>
            <Text style={styles.date}>
              {formatOrderDate(invoice?.date_created)}
            </Text>
          </View>
        </View>
        <View style={styles.row2}>
          <View>
            <Text style={styles.title}>SHIPPING ADDRESS</Text>
            <Text style={styles.text}>
              {invoice?.shipping.address1} {invoice?.shipping?.address2}
            </Text>
            <Text style={styles.text}>
              {invoice?.shipping.zip} {invoice?.shipping.city}{' '}
              {invoice?.shipping.state}
            </Text>
            <Text style={styles.text}>
              {getCountry(invoice?.shipping.country)}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>CUSTOMER</Text>
            <Text style={styles.text}>{invoice.billing.name}</Text>
            <Text style={styles.text}>{invoice.billing.address1}</Text>
            <Text style={styles.text}>{invoice.billing.address2}</Text>
            <Text
              style={styles.text}
            >{`${invoice.billing.zip} ${invoice.billing.city}`}</Text>
            <Text style={styles.text}>
              {invoice.billing.city} {getCountry(invoice.billing.country)}
            </Text>
          </View>
          <View style={styles.paymentMethod}>
            <View>
              <Text style={styles.title}>PAYMENT METHOD</Text>
              <Text style={styles.text}>{paymentMethod}</Text>
            </View>
            <View>
              <Text style={styles.title}>SHIPPING METHOD</Text>
              <Text style={styles.text}>{shippingMethod[0]?.name}</Text>
              <Text style={styles.text}>COVID-19 might cause delays</Text>
            </View>
          </View>
        </View>
        <View style={styles.row3}>
          <Text style={styles.itemsTitle}>ITEMS</Text>
          <Text style={styles.rowTitle}>PRICE</Text>
          <Text style={styles.rowTitle}>QTY</Text>
          <Text style={styles.rowTitle}>ITEM TOTAL</Text>
        </View>
        <View>
          {invoice.items.map((item: any) => (
            <InvoiceListPdf
              key={item.id}
              productId={item.product_id}
              quantity={item.quantity}
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
                price={invoice.sub_total}
                className="text-md font-thin"
              />
            </Text>
          </View>
          <View style={styles.innerRow}>
            <Text style={styles.text}>Shipping</Text>
            <Text style={styles.text}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.shipment_total}
                className="text-md font-thin"
              />
            </Text>
          </View>
          <View style={styles.innerRow}>
            <Text style={styles.title}>TOTAL ({invoice.currency})</Text>
            <Text style={styles.title}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.grand_total}
                className="text-lg font-bold"
              />
            </Text>
          </View>
          <View style={styles.totalEnd} />
        </View>
        <View style={styles.row5}>
          <Text style={styles.text}>
            Thank you for being the best part of Live Healthy Stores!
          </Text>
          <Text style={styles.storeName}>Live Healthy Store HK</Text>
          <Link style={styles.link} src="mailto:care@livehealthy.com.hk">
            care@livehealthy.com.hk
          </Link>
          <Link style={styles.link} src="www.livehealthy.com.hk">
            www.livehealthy.com.hk
          </Link>
          <View style={styles.fbLink}>
            <Image
              style={styles.fbIcon}
              src="https://res.cloudinary.com/verrb-inc/image/upload/v1653527164/icons8-facebook-48_f6d1ci.png"
            />
            <Text style={styles.text}>LiveHealthy Online Store</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
