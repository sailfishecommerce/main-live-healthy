/* eslint-disable no-fallthrough */
/* eslint-disable no-console */
import fs from 'fs'

import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'
// import algoliaProducts from "../../../algolia-data.json";

export default function UpdateAlgoliaIndexHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    'CZT5MA7JLJ',
    `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`
  )
  const index = client.initIndex('LIVEHEALTHY_PRODUCTION_INDEX')

  console.log('req.method', req.method, 'req.body', req.body)

  // const algoliaProducsArray: any = algoliaProducts;

  // eslint-disable-next-line prefer-const
  let productArray: any = []
  switch (req.method) {
    case 'GET': {
      // algoliaProducsArray.map((item, index) => {
      //   const categoryArray = item.product_categories[1]?.split(",");
      //   const tempData = {
      //     objectID: item.objectID,
      //     "categories.lvl0": item.product_categories[0],
      //     "categories.lvl1":
      //       categoryArray?.length > 0
      //         ? `${item.product_categories[0]} > ${categoryArray[0]}`
      //         : "",
      //     "categories.lvl2":
      //       categoryArray?.length > 1
      //         ? `${item.product_categories[0]} > ${categoryArray[0]} > ${categoryArray[1]}`
      //         : "",
      //     "categories.lvl3":
      //       categoryArray?.length > 2
      //         ? `${item.product_categories[0]} > ${categoryArray[0]} > ${categoryArray[1]} ${categoryArray[2]}`
      //         : "",
      //   };
      //   productArray.push(tempData);
      // });
      fs.writeFile(
        './algoliaProductData.json',
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
    }
    case 'POST': {
      index
        .partialUpdateObjects(req.body, {
          createIfNotExists: true,
        })
        .then((response) => {
          return res.status(200).json(response)
        })
        .catch((error) => {
          return res.status(400).json(error)
        })
    }
    default:
      return null
  }
}
