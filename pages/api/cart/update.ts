import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";
import swellNodeInit from "../../../lib/swellNode";

export default async function fetchProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit();

  const cart = req.body.cart;

  switch (req.method) {
    case "POST": {
      return await swell
        .put(`/carts/${req.body.id}`, cart)
        .then((response: any) => {
          return res.status(200).send(response);
        })
        .catch((error: any) => {
          return res.status(400).send(error);
        });
    }
  }
}
