import { Text, Image, View } from '@react-pdf/renderer'

import { itemStyles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'

export default function AirwallexInvoiceListPdf({ currency, product }: any) {
  const itemTotal = product.quantity * product.unit_price
  return (
    <>
      <View style={itemStyles.itemRow}>
        <View style={itemStyles.imageRow}>
          <Image
            src={product.url}
            alt={product.name}
            style={itemStyles.image}
          />
          <View>
            <Text style={itemStyles.productName}>{product?.name}</Text>
            <Text style={itemStyles.text}>SKU {product?.sku}</Text>
          </View>
        </View>
        <View style={itemStyles.itemTotal}>
          <Text style={itemStyles.price}>
            <FormattedPrice
              currency={currency}
              price={product.unit_price}
              className="text-md font-thin"
            />
          </Text>
        </View>
        <Text style={itemStyles.quantity}>{product.quantity}</Text>
        <Text style={itemStyles.itemTotal}>
          <FormattedPrice price={itemTotal} currency={currency} />
        </Text>
      </View>
    </>
  )
}
