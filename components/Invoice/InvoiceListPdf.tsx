/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/alt-text */
import { Text, View, Image } from '@react-pdf/renderer'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { itemStyles } from '@/components/Invoice/invoice-style'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'
import { invoiceProductsAtom } from '@/lib/atomConfig'

export default function InvoiceListPdf({ quantity, currency, productId }: any) {
  const [product, setProduct] = useState<any>(null)
  const { getAProduct } = useProduct()
  const [invoiceProduct] = useAtom(invoiceProductsAtom)
  const currentInvoiceProduct = invoiceProduct.filter(
    (product: any) => product.id === productId
  )
  console.log('invoiceProductinvoiceProduct', invoiceProduct)
  console.log('currentInvoiceProduct', currentInvoiceProduct)

  useEffect(() => {
    if (product === null)
      getAProduct(productId)
        .then((response) => {
          setProduct(response)
        })
        .catch((err) => {
          console.log('error-pdf', err)
          setProduct(null)
        })
  }, [])

  const productImage =
    typeof product?.images[0] === 'string'
      ? product?.images[0]
      : product?.images[0].file.url

  console.log('productImage', productImage)

  return (
    <View
      render={(_, product: any) => (
        <View style={itemStyles.viewHeight}>
          <View>
            {/* <View style={itemStyles.imageWrapper}>
              {productImage !== undefined && (
                <Image src={productImage} style={itemStyles.image} />
              )}
            </View> */}
            <View>
              <Text>{product?.name}</Text>
              <Text>SKU {product?.sku}</Text>
            </View>
          </View>
          <View>
            {product.price === product?.price && (
              <FormattedPrice
                price={product?.origPrice}
                className="text-md font-bold strike-through"
                currency={currency}
              />
            )}
            <FormattedPrice
              currency={currency}
              price={product.price}
              className="text-md font-thin"
            />
          </View>
          <View>
            <Text>{quantity}</Text>
          </View>
          <View>
            <FormattedPrice
              className="text-md font-thin"
              price={product.price}
              currency={currency}
            />
          </View>
        </View>
      )}
    />
  )
}
