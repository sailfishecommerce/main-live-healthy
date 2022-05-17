import Airtable from 'airtable'
import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import toShopifyProductModel from '../../lib/toShopifyProductModel'
import formattedUrlArray from '../../lib/useFormatProductImage'

const base = new Airtable({
  apiKey: `${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
}).base(`${process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY}`)

export default function createSwellProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let count = 0
  return new Promise<void>((resolve, reject) => {
    switch (req.method) {
      case 'GET': {
        base('To Shopify')
          .select({
            maxRecords: 14477,
            view: 'Grid view',
            filterByFormula: "NOT({Product Type} = ' ')",
          })
          .eachPage(
            function page(records, fetchNextPage) {
              try {
                records.forEach(function (record: any) {
                  if (record.fields) {
                    const formattedUrl = record.fields['Image Src']?.split(';')
                    if (formattedUrl) {
                      formattedUrlArray(formattedUrl, record).then(
                        async (response) => {
                          const productData = toShopifyProductModel(
                            record.fields,
                            response
                          )
                          await swell
                            .post('/products', productData)
                            .then((response: any) => {
                              if (!response?.errors) {
                                count = count + 1
                                
                                  'count',
                                  count,
                                  'createSwellProductHandler'
                                )
                              } else {
                                
                                  'count',
                                  count,
                                  response?.errors.slug.message
                                )
                              }
                            })
                            .catch((error: any) => {
                              console.error(
                                'error createSwellProductHandler',
                                error
                              )
                              throw Error(error)
                            })
                        }
                      )
                    }
                  }
                })
              } catch (e) {
                
                return res.status(400).send(e)
              }
              fetchNextPage()
            },
            function done(err) {
              if (err) {
                res.status(400).json({ status: err })
                console.error(err)
                reject()
                return res.status(400).send(err)
              }
              
              resolve()
              return res.status(200).send({ status: 'ok' })
            }
          )
      }
      default:
        return null
    }
  })
}
