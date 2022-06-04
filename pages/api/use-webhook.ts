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
        .get('/:webhooks', {
          url: 'http://localhost:3000/checkout',
          events: ['payment.created'],
        })
        .then((response: any) => {
          console.log('response', response)
          return res.status(200).send(response)
        })
        .catch((error: any) => {
          console.log('error', error)
          return res.status(400).send(error)
        })
    }
    default:
      return null
  }
}
