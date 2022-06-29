import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { createOrderType } from '@/typings/vbout-type'

export default function CreateVboutOrderItemHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const vboutEcommerceEndpoint = `https://api.vbout.com/1/ecommerce?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`

  const vboutDefault = {
    domain: 'VBT-43304-6887',
  }

  const postData: createOrderType = req.body

  switch (req.method) {
    case 'POST': {
      const postDataObj = {
        ...vboutDefault,
        ...postData,
      }
      return axios
        .post(`${vboutEcommerceEndpoint}/createorder`, postDataObj)
        .then((response: any) => {
          return res.status(200).send(response.data)
        })
        .catch((err: any) => {
          return res.status(400).send(err)
        })
    }
    default:
      return null
  }
}
