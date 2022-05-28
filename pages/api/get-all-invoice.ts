/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import getInvoiceproductIds from '../../lib/get-invoice-product-ids'
import swellNodeInit from '../../lib/swellNode'

export default async function InvoiceHandler(
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
    'orders.json'
  )
  let orderArray: any
  const productArray: any[] = []
  const invoiceArray: any[] = []

  switch (req.method) {
    case 'GET': {
      return await swell
        .get('/orders', {
          limit: 50,
        })
        .then((response: any) => {
          orderArray = response?.results
          return orderArray
        })
        .then((response: any) => {
          const ordersIds = getInvoiceproductIds(response)
          console.log('ordersIds', ordersIds)
          ordersIds.map((orderId) => {
            swell
              .get('/products/{id}', {
                id: orderId,
              })
              .then((response: any) => {
                productArray.push(response)
                return productArray
              })
              .then((response: any) => {
                console.log('responseresponse', response)
                console.log('orderArray', orderArray)
                orderArray.map((order: any) => {
                  order.items.map((orderItem: any) => {
                    console.log('orderItem', orderItem)
                    const orderProduct = response.filter(
                      (product: any) => product?.id === orderItem.product_id
                    )
                    console.log('orderProduct', orderProduct)
                    order.products = []
                    if (orderProduct.length > 0) {
                      order.products.push(orderProduct[0])
                    } else {
                      order.products = null
                    }
                  })
                  invoiceArray.push(order)
                })
                fs.writeFile(
                  filePath,
                  JSON.stringify(invoiceArray),
                  (err: any) => {
                    if (err) {
                      return res.status(400).json({ status: err })
                    }
                    return res.status(200).json({ status: 'ok' })
                  }
                )
              })
          })
        })
    }
    default:
      return null
  }
}
