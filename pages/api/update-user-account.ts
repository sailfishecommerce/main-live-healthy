import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function UpdateUserAccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'POST': {
      return await swell
        .put('/accounts/{id}', {
          id: req.body.id,
          ...req.body.update,
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
