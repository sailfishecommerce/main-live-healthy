/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'
import toShopifyProductModel from '@/lib/toShopifyProductModel'
import formattedUrlArray from '@/lib/useFormatProductImage'

let count = 0
let total = 0
export default async function UploadProductToSwellHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const productData = req.body.product
  const formatUrl = productData.fields['Image Src']?.split(';')
  const formatUrlArray = await formattedUrlArray(formatUrl.fields, productData)
  const swellProducts = toShopifyProductModel(
    productData.fields,
    formatUrlArray
  )

  switch (req.method) {
    case 'POST': {
      return await swell
        .post('/products', swellProducts)
        .then((response: any) => {
          total = total + 1
          console.log('productResponse', response)
          if (!response?.errors) {
            count = count + 1

            return res.status(200).send({ status: 'ok', response })
          }

          return res.status(200).send({ status: 'ok', response })
        })
        .catch((error: any) => {
          console.error('error createSwellProductHandler', error)
          throw Error(error)
        })
    }
    default:
      return null
  }
}
