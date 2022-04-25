import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";
import swellNodeInit from "../../lib/swellNode";

export default async function fetchProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit();
  const category = req.body.category;
  switch (req.method) {
    case "POST": {
      return await swell
        .get("/products", {
          where: { select_store: "livehealthy" },
          category,
        })
        .then((response: any) => {
          return res.status(200).send(response.results);
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    }
  }
}
