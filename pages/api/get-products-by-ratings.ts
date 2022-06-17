import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

swell.init(
  'sailfish-e-commerce-limited',
  `${process.env.NEXT_PUBLIC_SWELL_SECRET_KEY}`
)

export default async function GetProductsInRangeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productRange = req.body.query

  switch (req.method) {
    case 'POST': {
      return await swell
        .get('/products', {
          where: { select_store: 'livehealthy', rating: productRange },
          limit: 30,
        })
        .then((response: { results: any }) => {
          return res.status(200).json(response.results)
        })
        .catch((error: any) => {
          return res.status(400).json(error)
        })
    }
    default:
      return null
  }
}
