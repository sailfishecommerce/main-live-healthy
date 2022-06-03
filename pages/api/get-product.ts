import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function ProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'POST': {
      return await swell
        .get('/products/{id}', {
          id: req.body.id,
        })
        .then((response: any) => {
          return res.status(200).send(response)
        })
        .catch((err: any) => {
          return res.status(400).send(err)
        })
    }
    default:
      return null
  }
}
