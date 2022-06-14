/* eslint-disable no-console */
import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'

import toShopifyProductModel from '@/lib/toShopifyProductModel'
import { formatCsvUrlArray } from '@/lib/useFormatProductImage'
import { hierarchicalCategory } from '@/utils/formatToAlgolia'

export default function UploadToAlgoliaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const csvProducts: any = req.body

  switch (req.method) {
    case 'POST': {
      const productArray: any = []
      let productObj = {}
      return csvProducts.map(async (csvProduct: any) => {
        const formatProductUrl = csvProduct['Image Src']?.split(';')
        return await formatCsvUrlArray(formatProductUrl, csvProduct)
          .then((response) => {
            const formattedProduct = toShopifyProductModel(csvProduct, response)
            const hierarchicalCategoryObj = hierarchicalCategory(
              formattedProduct.product_categories
            )
            productObj = { ...hierarchicalCategoryObj, ...csvProduct }
            productArray.push(productObj)
            return productArray
          })
          .then((productArrayResponse) => {
            console.log(
              'productArrayResponse.length',
              productArrayResponse.length
            )
            return fs.writeFile(
              './new-products.json',
              JSON.stringify(productArrayResponse),
              (err: any) => {
                if (err) {
                  res.status(400).json({ status: err })
                  throw err
                } else {
                  console.log('File written successfully\n')
                  console.log('The written has the following contents:')
                  console.log(fs.readFileSync('./new-products.json', 'utf8'))
                }
              }
            )
          })
      })
    }

    default:
      return null
  }
}
