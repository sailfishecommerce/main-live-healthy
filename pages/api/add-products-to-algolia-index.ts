import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function AddProductToAlgoliaIndiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    'CZT5MA7JLJ',
    `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`
  )
  const index = client.initIndex('Livehealthy__products')

  switch (req.method) {
    case 'POST': {
      return index
        .saveObjects(req.body.productArray, {
          autoGenerateObjectIDIfNotExist: true,
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
