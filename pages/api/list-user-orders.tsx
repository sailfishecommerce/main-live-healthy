import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function ListUserOrderAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'POST': {
      return await swell
        .get('/orders', {
          where: {
            account_id: req.body.accountID,
          },
        })
        .then((response: any) => {
          return res.status(200).send(response.results)
        })
        .catch((error: any) => {
          return res.status(200).send(error)
        })
    }
    default:
      return null
  }
}
