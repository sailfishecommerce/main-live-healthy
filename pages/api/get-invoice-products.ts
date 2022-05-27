/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default function InvoiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'json',
    'invoice-product.json'
  )
  const invoiceProductArray: string[] = []
  console.log('filePath', filePath)

  switch (req.method) {
    case 'POST': {
      const productIDs: string[] = req.body.ordersIds
      return productIDs.map((productId: string) => {
        swell
          .get('/products/{id}', {
            id: productId,
          })
          .then((response: any) => {
            invoiceProductArray.push(response)
            return invoiceProductArray
          })
          .then((response: any) => {
            fs.writeFile(filePath, JSON.stringify(response), (err: any) => {
              if (err) {
                return res.status(400).json({ status: err })
              }
              return res.status(200).json({ status: 'ok' })
            })
          })
      })
    }
    default:
      return null
  }
}
