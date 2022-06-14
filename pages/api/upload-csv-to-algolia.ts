/* eslint-disable no-console */
import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'

import toShopifyProductModel from '@/lib/toShopifyProductModel'
import { formatCsvUrlArray } from '@/lib/useFormatProductImage'
import { hierarchicalCategory } from '@/utils/formatToAlgolia'

export default async function UploadToAlgoliaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productArray: any = []
  let productObj = {}

  const csvProducts: any = req.body

  const formatProductUrl = csvProducts['Image Src']?.split(';')
  const formatUrlArray = await formatCsvUrlArray(formatProductUrl, csvProducts)
  const formattedProduct = toShopifyProductModel(csvProducts, formatUrlArray)
  const hierarchicalCategoryObj = hierarchicalCategory(
    formattedProduct.product_categories
  )
  productObj = { ...hierarchicalCategoryObj, ...csvProducts }
  productArray.push(productObj)

  switch (req.method) {
    case 'POST': {
      console.log('productArray.length', productArray?.length)

      console.log('productArray', productArray)
      return fs.writeFile(
        './new-products.json',
        JSON.stringify(productArray),
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
    }

    default:
      return null
  }
}
