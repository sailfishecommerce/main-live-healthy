import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default async function UpdateUserAccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()

  switch (req.method) {
    case 'PUT': {
      const { email, firstName, lastName } = req.body.update
      console.log('email', email)
      return await swell
        .put('/accounts/{id}', {
          id: req.body.id,
          email,
          first_name: firstName,
          last_name: lastName,
        })
        .then((response: any) => {
          console.log('response', response)
          return res.status(200).send(response)
        })
        .catch((err: any) => {
          console.log('err', err)
          return res.status(400).send(err)
        })
    }
    default:
      return null
  }
}
