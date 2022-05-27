/* eslint-disable no-console */
import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default function InvoiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const filePath = './invoice-products.json'
  const invoiceProductArray: string[] = []

  async function getSwellProduct(productId: string) {
    return await swell
      .get('/products/{id}', {
        id: productId,
      })
      .then((response: any) => {
        console.log('response', response)
        invoiceProductArray.push(response)
      })
  }
  switch (req.method) {
    case 'POST': {
      const productIDs: string[] = req.body.productIds

      productIDs.map((productId: string) => getSwellProduct(productId))
      return fs.writeFile(
        filePath,
        JSON.stringify(invoiceProductArray),
        (err: any) => {
          if (err) {
            return res.status(400).json({ status: err })
          }
          return res.status(200).json({ status: 'ok' })
        }
      )
    }
    default:
      return null
  }
}
