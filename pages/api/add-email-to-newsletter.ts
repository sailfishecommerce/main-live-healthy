import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function AddEmailToNewsletterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, listid } = req.body
  switch (req.method) {
    case 'POST': {
      return axios
        .post(
          `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
          { status: 'active', email, listid }
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
