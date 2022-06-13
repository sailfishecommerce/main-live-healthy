import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'
import toShopifyProductModel from '@/lib/toShopifyProductModel'
import { formatCsvUrlArray } from '@/lib/useFormatProductImage'

let count = 0
let total = 0
export default async function UploadProductToSwellHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const productData = req.body
  const formatUrl = productData['Image Src']?.split(';')
  const formatUrlArray = await formatCsvUrlArray(formatUrl, productData)
  const swellProducts = toShopifyProductModel(productData, formatUrlArray)
  switch (req.method) {
    case 'POST': {
      return await swell
        .post('/products', swellProducts)
        .then((response: any) => {
          total = total + 1

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
