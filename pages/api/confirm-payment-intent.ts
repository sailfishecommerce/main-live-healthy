/* eslint-disable no-fallthrough */
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function CreatePaymentIntentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_AIRWALLEX_DEMO_BASE_API}/pa/payment_intents/${req.body.id}/confirm`,
          req.body.cardDetails,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${req.body.auth}`,
            },
          }
        )
        .then((response) => {
          return res.status(200).json(response.data)
        })
        .catch((error) => {
          return res.status(400).json(error)
        })
    }
    default:
      return null
  }
}
