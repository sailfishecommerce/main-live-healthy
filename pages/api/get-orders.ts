/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function InvoiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()
  switch (req.method) {
    case 'GET': {
      return await swell
        .get('/orders', {
          limit: 50,
        })
        .then((response: any) => {
          console.log('response-InvoiceHandler', response)
          return res.status(200).send(response)
        })
    }
    default:
      return null
  }
}
