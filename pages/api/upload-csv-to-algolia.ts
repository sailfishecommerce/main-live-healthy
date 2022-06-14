/* eslint-disable no-console */
import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'

import toShopifyProductModel from '@/lib/toShopifyProductModel'
import { formatCsvUrlArray } from '@/lib/useFormatProductImage'
import { hierarchicalCategory } from '@/utils/formatToAlgolia'

export default function UploadToAlgoliaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const csvProducts: any = req.body
  const client = algoliasearch(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID}`,
    `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`
  )
  const index = client.initIndex(
    `${process.env.NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME}`
  )

  switch (req.method) {
    case 'POST': {
      // const productArray: any = []

      const promises = csvProducts.map(async (csvProduct: any) => {
        const formatProductUrl = csvProduct['Image Src']?.split(';')
        const formattedCSV = await formatCsvUrlArray(
          formatProductUrl,
          csvProduct
        )
        const formattedProduct = toShopifyProductModel(csvProduct, formattedCSV)
        const hierarchicalCategoryObj = hierarchicalCategory(
          formattedProduct.product_categories
        )
        const productObj = { ...hierarchicalCategoryObj, ...csvProduct }
        return productObj
      })
      return Promise.all(promises).then((result) =>
        index
          .saveObjects(result, {
            autoGenerateObjectIDIfNotExist: true,
          })
          .then((response) => {
            console.log('response-algolia', response)
            res.status(200).json(response)
          })
          .catch((error) => {
            console.log('error', error)
            res.status(400).json(error)
          })
      )
    }
    default:
      return null
  }
}
