import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'

export default async function getAvailableDiscountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit()

  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'json',
    'available-discount.json'
  )

  switch (req.method) {
    case 'GET': {
      return await swell
        .get('/coupons', {
          where: { active: true },
        })
        .then((response: any) => {
          fs.writeFile(filePath, JSON.stringify(response.results), (err) => {
            if (err) {
              return res.status(400).json({ status: err })
            }
            return res.status(200).json({ status: 'discount written' })
          })
          return res.status(200).send(response.results)
        })
    }
    default:
      return null
  }
}
