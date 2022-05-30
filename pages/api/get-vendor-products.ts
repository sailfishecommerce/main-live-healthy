import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function VendorProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  const vendor = req.body.vendor
  switch (req.method) {
    case 'POST': {
      return await swell
        .get('/products', {
          where: { select_store: 'livehealthy', vendor },
          limit: 30,
        })
        .then((response: any) => {
          return res.status(200).send(response)
        })
    }
    default:
      return null
  }
}
