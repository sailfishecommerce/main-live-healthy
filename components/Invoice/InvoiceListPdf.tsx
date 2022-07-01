/* eslint-disable jsx-a11y/alt-text */
import { Text, View, Image } from '@react-pdf/renderer'
import { useCallback } from 'react'

import { itemStyles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'

export default function InvoiceListPdf({ item, currency, product }: any) {
  const productImageCallback = useCallback(() => {
    return typeof product?.images[0] === 'string'
      ? product?.images[0]
      : product?.images[0].file.url
  }, [product.images])

  const productImage = productImageCallback()
  return (
    <>
      {product !== undefined || product !== null ? (
        <View style={itemStyles.itemRow}>
          <View style={itemStyles.imageRow}>
            {productImage !== undefined && (
              <Image src={productImage} style={itemStyles.image} />
            )}
            <View>
              <Text style={itemStyles.productName}>{product?.name}</Text>
              <Text style={itemStyles.text}>SKU {product?.sku}</Text>
            </View>
          </View>
          <View style={itemStyles.itemTotal}>
            <Text style={itemStyles.strikeThrough}>
              {Number(item?.price) > Number(item?.orig_price) ? (
                <FormattedPrice price={item?.price} currency={currency} />
              ) : null}
            </Text>
            <Text style={itemStyles.price}>
              <FormattedPrice currency={currency} price={item?.orig_price} />
            </Text>
          </View>
          <Text style={itemStyles.quantity}>{item.quantity}</Text>
          <Text style={itemStyles.itemTotal}>
            <FormattedPrice price={item?.price_total} currency={currency} />
          </Text>
        </View>
      ) : null}
    </>
  )
}
