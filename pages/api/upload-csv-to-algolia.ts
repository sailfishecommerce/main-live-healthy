/* eslint-disable no-console */
import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'

import { hierarchicalCategory } from '@/utils/formatToAlgolia'

export default function UploadToAlgoliaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productArray: any = []
  let productObj = {}

  const swellProductArray: any = req.body
  console.log('req.body', req.body)
  switch (req.method) {
    case 'POST': {
      swellProductArray.forEach(function (product: any) {
        const hierarchicalCategoryObj = hierarchicalCategory(
          product.product_categories
        )
        productObj = { ...hierarchicalCategoryObj, ...product }
        productArray.push(productObj)
      })
      console.log('productArray.length', productArray?.length)
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
