import { Text, Image, View } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'

export default function InvoiceListPdf({ quantity, currency, productId }: any) {
  const [product, setProduct] = useState<any>(null)
  const { getAProduct } = useProduct()

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

  console.log('product', product)

  const productImage =
    typeof product?.images[0] === 'string'
      ? product?.images[0]
      : product?.images[0].file.url

  const productPrice = currency === 'HKD' ? product?.price : product?.origPrice

  return (
    <>
      {product !== null && (
        <View>
          <View>
            <View>
              {/* <Image src={productImage} height="200px" width="200ppx" /> */}
            </View>
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
              price={productPrice}
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
    </>
  )
}
