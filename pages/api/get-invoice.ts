import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellNodeInit from '../../lib/swellNode'

export default function GetInvoiceHandler(req: NextApiRequest, res: NextApiResponse){
    swellNodeInit()

    switch(req.method){
        case "GET":{
            await swell.get("/")
        }
    }
}