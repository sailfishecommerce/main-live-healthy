/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import { useQuery } from 'react-query'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'

export default function InvoiceListPdf({ quantity, currency, productId }: any) {
  const { getAProduct } = useProduct()
  const { data, status } = useQuery(`productDetails-${productId}`, () =>
    getAProduct(productId)
  )

  const productImage =
    typeof data?.images[0] === 'string'
      ? data?.images[0]
      : data?.images[0].file.url

  const productPrice = currency === 'HKD' ? data?.price : data?.origPrice

  return (
    <>
      {status === 'error' ? (
        'unable to load item'
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : (
        <Document>
          <Page>
            <View>
              <View>
                <Image src={productImage} />
              </View>
              <View>
                <Text>{data?.name}</Text>
                <Text>SKU {data?.sku}</Text>
              </View>
            </View>
            <View>
              {data.price === data?.price && (
                <FormattedPrice
                  price={data?.origPrice}
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
                price={data.price}
                currency={currency}
              />
            </View>
          </Page>
        </Document>
      )}
    </>
  )
}
