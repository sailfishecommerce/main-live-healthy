/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  Image,
  Font,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer'
import dynamic from 'next/dynamic'

import FormattedPrice from '@/components/Price/FormattedPrice'
import { formatOrderDate } from '@/lib/formatOrderDate'
import getCountry from '@/lib/getCountry'
import getShippingMethod from '@/lib/shippingMethod'

const InvoiceList = dynamic(
  () =>
    import(
      /* webpackChunkName: 'InvoiceList' */ '@/components/Invoice/InvoiceList'
    ),
  {
    ssr: false,
  }
)

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
})

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
})

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
})

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
})

const styles = StyleSheet.create({
  page: {
    width: '100%',
    padding: 20,
  },
  image: {
    height: 50,
    width: 150,
  },
  date: {
    fontSize: 14,
    fontWeight: 300,
  },
  toRight: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  orderNumber: {
    fontSize: 25,
    fontWeight: 1000,
  },
  fbIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: 300,
    fontFamily: 'Lato',
    fontColor: 'gray',
  },
  title: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 100,
  },
  row3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTop: '1px solid gray',
    paddingTop: 5,
  },
  paymentMethod: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  storeName: {
    fontWeight: 1000,
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginTop: 20,
  },
  row4: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  link: {
    margin: '2px 0px',
    fontSize: 12,
    fontFamily: 'Lato',
  },
  row5: {
    display: 'flex',
    alignItems: 'center',
  },
  fbLink: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
})

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
          <Text style={styles.title}>ITEMS</Text>
          <Text style={styles.title}>PRICE</Text>
          <Text style={styles.title}>QTY</Text>
          <Text style={styles.title}>ITEM TOTAL</Text>
        </View>
        {/* <View>
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
        </View> */}
        <View style={styles.row4}>
          <Text style={styles.text}>
            Subtotal
            <FormattedPrice
              currency={invoice.currency}
              price={invoice.sub_total}
              className="text-md font-thin"
            />
          </Text>
          <View>
            <Text style={styles.title}>Shipping</Text>
            <Text style={styles.text}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.shipment_total}
                className="text-md font-thin"
              />
            </Text>
          </View>
          <View>
            <Text style={styles.title}>TOTAL ({invoice.currency})</Text>
            <Text style={styles.text}>
              <FormattedPrice
                currency={invoice.currency}
                price={invoice.grand_total}
                className="text-lg font-bold"
              />
            </Text>
          </View>
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
