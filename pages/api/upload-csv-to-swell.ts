/* eslint-disable no-console */
import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'
import toShopifyProductModel from '@/lib/toShopifyProductModel'
import formattedUrlArray from '@/lib/useFormatProductImage'
import { hierarchicalCategory } from '@/utils/formatToAlgolia'

let uploaded = 0
export default async function UploadProductToSwellHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const productData = req.body.dataItem
  const total = req.body.numberOfProducts
  const formatUrl = productData['Image Src']?.split(';')
  const formatUrlArray = await formattedUrlArray(formatUrl, productData)
  const swellProducts = toShopifyProductModel(productData, formatUrlArray)

  const client = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`
  )
  const index = client.initIndex(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME}`
  )

  switch (req.method) {
    case 'POST': {
      return await swell
        .post('/products', swellProducts)
        .then((response: any) => {
          if (!response?.errors) {
            const formattedCategories = hierarchicalCategory(
              response.product_categories
            )
            const formattedProduct = { ...formattedCategories, ...response }
            uploaded = uploaded + 1
            console.log('totaltotal', total, 'uploadeduploaded', uploaded)

            index
              .saveObject(formattedProduct, {
                autoGenerateObjectIDIfNotExist: true,
              })
              .then((responseItem: any) => {
                console.log('response-algolia', responseItem)
              })
              .catch((error) => {
                console.log('error', error)
                return res.status(400).json(error)
              })
          }
          return res.status(200).json({ status: 'ok', uploaded, total })
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
