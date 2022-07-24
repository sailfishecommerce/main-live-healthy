import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function UpdateShipping(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'PUT': {
      return await swell
        .put(`/carts/${req.body.cartId}`, {
          shipping: req.body.shipping,
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
