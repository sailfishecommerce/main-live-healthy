/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-fallthrough */
/* eslint-disable no-console */
import fs from 'fs'

import Airtable from 'airtable'
import type { NextApiRequest, NextApiResponse } from 'next'

const base = new Airtable({
  apiKey: `${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
}).base(`${process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY}`)
export default function createSwellProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = './airtabletoShopifyproducts.json'
  const productArray: any = []

  return new Promise<void>((resoclve, reject) => {
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
                  console.log('productArray length', productArray.length)
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
                      console.log('Error writing file', err)
                      throw err
                    } else {
                      console.log('Successfully wrote file')
                    }
                  }
                )
              } catch (e) {
                console.log('error inside each page', e)
              }
              fetchNextPage()
              // res.status(200).json({ status: "ok" });
            },
            function done(err) {
              console.log('now done!!')
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
