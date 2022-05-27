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

  console.log('invoiceProduct', invoiceProduct)

  return (
    <View style={itemStyles.viewHeight}>
      {productImage !== null && (
        <View style={itemStyles.viewHeight}>
          {/* <View>
            <View style={itemStyles.imageWrapper}>
              {productImage !== undefined && (
                <Image src={productImage} style={itemStyles.image} />
              )}
            </View>
            <View>
              <Text>{productImage?.name}</Text>
              <Text>SKU {productImage?.sku}</Text>
            </View>
          </View> */}
          {/* <View style={itemStyles.viewHeight}>
            {productImage?.productImage && (
              <FormattedPrice
                price={productImage?.price}
                // className="text-md font-bold strike-through"
                currency={currency}
              />
            )}
            <FormattedPrice
              currency={currency}
              price={productImage.sale_price}
              //   className="text-md font-thin"
            />
          </View> */}
          <View style={{ height: 100 }}>
            <Text>{quantity}</Text>
          </View>
          <View style={{ height: 100 }}>
            <FormattedPrice
              //   className="text-md font-thin"
              price={productImage.sale_price}
              currency={currency}
            />
          </View>
        </View>
      )}
    </View>
  )
}
