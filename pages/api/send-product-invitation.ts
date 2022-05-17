/* eslint-disable no-fallthrough */
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function SendProductInvitationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      axios
        .post(
          'https://trustmate.io/api/invitation/dispatch',
          req.body.trustmateData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          res.status(200).send(response.data)
        })
        .catch((error) => {
          res.status(400).send(error)
        })
    }
    default:
      return null
  }
}
