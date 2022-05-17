/* eslint-disable no-console */
import fs from 'fs'
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
  const filePath = './airtabletoShopifyproducts.json'
  let productArray: any = []

  return new Promise<void>((resolve, reject) => {
    switch (req.method) {
      case 'GET': {
        base('To Shopify')
          .select({
            maxRecords: 13558,
            view: 'Grid view',
            filterByFormula: "AND(NOT({Product Type} = ''), NOT({Exclude} ))",
          })
          .eachPage(
            function page(records, fetchNextPage) {
              try {
                records.forEach(function (record) {
                  const recordData = {
                    id: record.id,
                    fields: record.fields,
                  }
                  productArray.push(recordData)
                })
                fs.writeFile(
                  filePath,
                  JSON.stringify(productArray),
                  (err: any) => {
                    if (err) {
                      throw err
                    } else {
                    }
                  }
                )
              } catch (e) {}
              fetchNextPage()
              // res.status(200).json({ status: "ok" });
            },
            function done(err) {
              if (err) {
                res.status(400).json({ status: err })
                console.error(err)
                return
              }
            }
          )
      }
      default:
        return null
    }
  })
}
