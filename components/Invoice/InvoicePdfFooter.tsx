/* eslint-disable jsx-a11y/alt-text */
import { Text, Image, View, Link } from '@react-pdf/renderer'

import { styles } from '@/components/Invoice/invoice-style'

export default function InvoicePdfFooter() {
  return (
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
  )
}
