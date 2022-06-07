/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import getInvoiceproductIds from '../../lib/get-invoice-product-ids'
import swellNodeInit from '../../lib/swellNode'

export default async function InvoiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()

  let orderArray: any
  const productArray: any[] = []
  const invoiceArray: any[] = []
  let orderProductsArray: any[] = []

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
          orderArray = response
          const ordersIds = getInvoiceproductIds(response)
          ordersIds.map((orderId) => {
            swell
              .get('/products/{id}', {
                id: orderId,
              })
              .then((response: any) => {
                productArray.push(response)
                return { productArray, orderArray }
              })
              .then((response: any) => {
                response.orderArray.map((order: any) => {
                  order.items.map((orderItem: any) => {
                    const orderProducts = response.productArray.filter(
                      (product: any) => product?.id === orderItem.product_id
                    )
                    if (orderProducts.length > 0) {
                      orderProductsArray.push(orderProducts[0])
                    } else {
                      orderProductsArray = []
                    }
                  })
                  order.products = orderProductsArray

                  invoiceArray.push(order)
                })

                return res.json({ invoiceArray })
              })
          })
        })
    }
    default:
      return null
  }
}
