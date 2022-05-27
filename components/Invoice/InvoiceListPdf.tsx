/* eslint-disable jsx-a11y/alt-text */
import { Text, View, Image } from '@react-pdf/renderer'

import { itemStyles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'
import invoiceProducts from '@/json/invoice-product.json'

export default function InvoiceListPdf({ quantity, currency, productId }: any) {
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
        <View style={itemStyles.itemRow}>
          <View style={itemStyles.imageRow}>
            <Image src={productImage} style={itemStyles.image} />
            <View>
              <Text style={itemStyles.productName}>{invoiceProduct?.name}</Text>
              <Text style={itemStyles.text}>SKU {invoiceProduct?.sku}</Text>
            </View>
          </View>
          <View style={itemStyles.itemTotal}>
            <Text style={itemStyles.strikeThrough}>
              {invoiceProduct.price ? (
                <FormattedPrice
                  price={invoiceProduct?.price}
                  currency={currency}
                />
              ) : null}
            </Text>
            <Text style={itemStyles.price}>
              <FormattedPrice
                currency={currency}
                price={invoiceProduct?.sale_price}
              />
            </Text>
          </View>
          <Text style={itemStyles.quantity}>{quantity}</Text>
          <Text style={itemStyles.itemTotal}>
            <FormattedPrice
              price={invoiceProduct?.sale_price}
              currency={currency}
            />
          </Text>
        </View>
      ) : null}
    </>
  )
}
